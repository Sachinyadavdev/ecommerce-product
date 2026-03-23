"use client";

import { useEffect, useRef, useCallback, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/* ── Brand colours ── */
const BLUE   = "#163c8c";
const GREEN  = "#02a957";
const BLUE_D = "#0c2458";
const BLUE_M = "#1a4098";

const W = 580, H = 170, CY = 80, TOTAL_DUR = 5200;

const WO  = [-12,-7,-2,2,7,12];
const WCL = ["#c83030","#2a6fd8","#1a8848","#c07818","#6828a0","#188888"];
const WCR = ["#4a5a70","#6888a8","#4a5a70","#88a0b8","#6888a8","#88a0b8"];
const WL  = [46,52,40,58,50,38];

const lerp  = (a:number,b:number,t:number)=>a+(b-a)*t;
const clamp = (v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
const ez = {
  out3:(t:number)=>1-(1-t)**3,
  back:(t:number)=>1+2.4*(t-1)**3+1.4*(t-1)**2,
  io:  (t:number)=>t<.5?4*t**3:1-((-2*t+2)**3)/2,
};
const getPhase=(T:number)=>T<.40?0:T<.62?1:T<.76?2:T<.86?3:T<.93?4:5;

/* ── Canvas draw helpers ── */
function drawBPLine(ctx:CanvasRenderingContext2D,ln:any,T:number){
  const p=clamp((T-ln.t0)/(ln.t1-ln.t0),0,1);if(p<=0)return;
  ctx.beginPath();ctx.moveTo(ln.x1,ln.y1);ctx.lineTo(lerp(ln.x1,ln.x2,p),lerp(ln.y1,ln.y2,p));ctx.stroke();
}

function buildBP(cx:number,cy:number){
  const L:{x1:number,y1:number,x2:number,y2:number,t0:number,t1:number}[]=[];
  const a=(x1:number,y1:number,x2:number,y2:number,t0:number,t1:number)=>L.push({x1,y1,x2,y2,t0,t1});
  const fw=76,fh=58,fx=cx-128;
  a(fx,cy-fh/2,fx+fw,cy-fh/2,.02,.07);a(fx+fw,cy-fh/2,fx+fw,cy+fh/2,.06,.10);
  a(fx+fw,cy+fh/2,fx,cy+fh/2,.09,.13);a(fx,cy+fh/2,fx,cy-fh/2,.12,.16);
  for(let r=0;r<3;r++)for(let c=0;c<2;c++){
    const gx=fx+fw-26+c*12,gy=cy-14+r*13,tt=.14+r*.02+c*.01;
    a(gx,gy,gx+10,gy,tt,tt+.022);a(gx+10,gy,gx+10,gy+10,tt+.01,tt+.032);
    a(gx+10,gy+10,gx,gy+10,tt+.02,tt+.042);a(gx,gy+10,gx,gy,tt+.025,tt+.047);
  }
  const mx=cx+52,mw=76,mh=58;
  a(mx,cy-mh/2,mx+mw,cy-mh/2,.18,.23);a(mx+mw,cy-mh/2,mx+mw,cy+fh/2,.22,.26);
  a(mx+mw,cy+fh/2,mx,cy+fh/2,.25,.29);a(mx,cy+fh/2,mx,cy-mh/2,.28,.32);
  for(let r=0;r<3;r++)for(let c=0;c<2;c++){
    const gx=mx+7+c*12,gy=cy-14+r*13,tt=.30+r*.02+c*.01;
    a(gx+3,gy,gx+3,gy+9,tt,tt+.026);
  }
  a(mx+16,cy-mh/2-10,mx+58,cy-mh/2-10,.34,.37);
  a(fx+16,cy-fh/2-8,fx+58,cy-fh/2-8,.35,.38);
  WO.forEach((dy,i)=>{
    a(fx-50,cy+dy,fx,cy+dy,.36+i*.006,.40+i*.006);
    a(mx+mw,cy+dy,mx+mw+50,cy+dy,.37+i*.006,.41+i*.006);
  });
  return L;
}

function dim(ctx:CanvasRenderingContext2D,x1:number,y:number,x2:number,lbl:string,a:number){
  ctx.save();ctx.globalAlpha=a*.5;ctx.strokeStyle=GREEN;ctx.lineWidth=.5;
  ctx.beginPath();ctx.moveTo(x1,y-6);ctx.lineTo(x1,y+6);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x2,y-6);ctx.lineTo(x2,y+6);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x1,y);ctx.lineTo(x2,y);ctx.stroke();
  ctx.fillStyle=GREEN;ctx.font="7.5px 'Courier New',monospace";ctx.textAlign="center";ctx.fillText(lbl,(x1+x2)/2,y-9);ctx.restore();
}

function drawHousing(ctx:CanvasRenderingContext2D,cx:number,cy:number,fw:number,fh:number,side:"L"|"R",alpha:number,ft:number){
  const s=ez.out3(ft),d=8;
  ctx.save();ctx.globalAlpha=alpha;
  if(s>0){
    ctx.globalAlpha=alpha*s*.5;ctx.fillStyle=BLUE_D;
    ctx.beginPath();
    if(side==="L"){ctx.moveTo(cx+fw/2,cy-fh/2);ctx.lineTo(cx+fw/2+d,cy-fh/2-d*.36);ctx.lineTo(cx+fw/2+d,cy+fh/2-d*.36);ctx.lineTo(cx+fw/2,cy+fh/2);}
    else{ctx.moveTo(cx-fw/2,cy-fh/2);ctx.lineTo(cx-fw/2-d,cy-fh/2-d*.36);ctx.lineTo(cx-fw/2-d,cy+fh/2-d*.36);ctx.lineTo(cx-fw/2,cy+fh/2);}
    ctx.closePath();ctx.fill();
    ctx.globalAlpha=alpha*s*.35;ctx.fillStyle=BLUE_M;
    ctx.beginPath();
    ctx.moveTo(cx-fw/2,cy-fh/2);ctx.lineTo(cx+fw/2,cy-fh/2);
    ctx.lineTo(cx+fw/2+d*(side==="L"?1:-1),cy-fh/2-d*.36);
    ctx.lineTo(cx-fw/2+d*(side==="L"?1:-1),cy-fh/2-d*.36);
    ctx.closePath();ctx.fill();
  }
  ctx.globalAlpha=alpha*(.08+s*.82);
  const g=ctx.createLinearGradient(cx-fw/2,cy-fh/2,cx+fw/2,cy+fh/2);
  g.addColorStop(0,s>.3?"#1a4098":"transparent");g.addColorStop(1,s>.3?"#0e2460":"transparent");
  ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(cx-fw/2,cy-fh/2,fw,fh,4);ctx.fill();
  ctx.globalAlpha=alpha;ctx.strokeStyle=s>.3?"#2a5acc":BLUE;ctx.lineWidth=s>.3?.9:.65;
  ctx.setLineDash(s>.3?[]:[4,4]);ctx.beginPath();ctx.roundRect(cx-fw/2,cy-fh/2,fw,fh,4);ctx.stroke();ctx.setLineDash([]);
  if(s>.4){
    const rx=side==="L"?cx-fw/2+5:cx+fw/2-9;
    ctx.globalAlpha=alpha*s*.8;ctx.fillStyle="#0a1e50";
    for(let i=0;i<3;i++){ctx.fillRect(rx,cy-8+i*7,4,5);ctx.strokeStyle="#2a5acc";ctx.lineWidth=.35;ctx.strokeRect(rx,cy-8+i*7,4,5);}
  }
  ctx.restore();
}

function drawLatch(ctx:CanvasRenderingContext2D,cx:number,cyTop:number,side:"L"|"R",alpha:number,ft:number,lifted:boolean){
  const s=ez.out3(ft),lh=10,lw=30,ly=cyTop-lh-(lifted?8:0);
  ctx.save();ctx.globalAlpha=alpha;
  ctx.fillStyle=side==="R"&&s>.4?"#014d30":"transparent";
  ctx.strokeStyle=side==="R"&&s>.4?GREEN:s>.4?"#2a5acc":BLUE;
  ctx.lineWidth=s>.4?.9:.65;ctx.setLineDash(s>.4?[]:[4,4]);
  ctx.beginPath();ctx.roundRect(cx-lw/2,ly,lw,lh,2);ctx.fill();ctx.stroke();ctx.setLineDash([]);
  if(s>.4&&side==="R"){
    ctx.strokeStyle=GREEN;ctx.lineWidth=1;ctx.globalAlpha=alpha*.5;
    ctx.beginPath();ctx.moveTo(cx-8,ly+lh/2);ctx.lineTo(cx+3,ly+lh/2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx+6,ly+lh/2);ctx.lineTo(cx+12,ly+lh/2);ctx.stroke();
  }
  ctx.restore();
}

function drawCavityFace(ctx:CanvasRenderingContext2D,cx:number,cy:number,fw:number,litN:number,alpha:number,ft:number){
  const s=ez.out3(ft),fx=cx+fw/2-38,fy=cy-22;
  ctx.save();
  if(s>.3){ctx.globalAlpha=alpha;ctx.fillStyle="#050c1e";ctx.beginPath();ctx.roundRect(fx,fy,36,44,3);ctx.fill();ctx.strokeStyle="#0e1e48";ctx.lineWidth=.55;ctx.beginPath();ctx.roundRect(fx,fy,36,44,3);ctx.stroke();}
  for(let r=0;r<3;r++)for(let c=0;c<2;c++){
    const i=r*2+c,gx=fx+4+c*16,gy=fy+5+r*13;
    ctx.globalAlpha=alpha*(s>.25?1:s*4);
    if(i<litN){ctx.fillStyle="#013820";ctx.shadowColor=GREEN;ctx.shadowBlur=10;}
    else{ctx.fillStyle=s>.3?"#04091a":"transparent";ctx.shadowBlur=0;}
    ctx.strokeStyle=s>.3?"#0e1e48":BLUE;ctx.lineWidth=.5;
    ctx.setLineDash(s>.3?[]:[3,3]);ctx.beginPath();ctx.roundRect(gx,gy,10,10,2);ctx.fill();ctx.stroke();ctx.setLineDash([]);ctx.shadowBlur=0;
  }
  ctx.restore();
}

function drawPinFace(ctx:CanvasRenderingContext2D,cx:number,cy:number,fw:number,litN:number,alpha:number,ft:number){
  const s=ez.out3(ft),px=cx-fw/2+2,pfy=cy-22;
  ctx.save();
  if(s>.3){ctx.globalAlpha=alpha;ctx.fillStyle="#04081a";ctx.beginPath();ctx.roundRect(px,pfy,36,44,3);ctx.fill();ctx.strokeStyle="#0e1e48";ctx.lineWidth=.55;ctx.beginPath();ctx.roundRect(px,pfy,36,44,3);ctx.stroke();}
  for(let r=0;r<3;r++)for(let c=0;c<2;c++){
    const i=r*2+c,gx=px+8+c*13,gy=pfy+5+r*13;
    ctx.globalAlpha=alpha*(s>.25?1:s*4);
    if(i<litN){ctx.fillStyle=GREEN;ctx.shadowColor=GREEN;ctx.shadowBlur=10;}
    else{ctx.fillStyle=s>.3?"#1a3030":"transparent";ctx.shadowBlur=0;}
    ctx.strokeStyle=s>.3?"#0e2020":"#145040";ctx.lineWidth=.5;
    ctx.setLineDash(s>.3?[]:[2,3]);
    if(s>.3){ctx.fillRect(gx,gy,4,9);ctx.strokeRect(gx,gy,4,9);}
    else{ctx.beginPath();ctx.moveTo(gx+2,gy);ctx.lineTo(gx+2,gy+9);ctx.stroke();}
    ctx.setLineDash([]);ctx.shadowBlur=0;
  }
  ctx.restore();
}

function drawWires(ctx:CanvasRenderingContext2D,cx:number,cy:number,fw:number,side:"L"|"R",n:number,alpha:number,anim:boolean,ts:number){
  ctx.save();
  for(let i=0;i<n;i++){
    const dy=WO[i],col=side==="L"?WCL[i]:WCR[i];
    const hEdge=side==="L"?cx-fw/2:cx+fw/2;
    const far=side==="L"?hEdge-WL[i]:hEdge+WL[i];
    const x1=side==="L"?far:hEdge,x2=side==="L"?hEdge:far;
    const w=anim?Math.sin(ts*.0008+i*.85)*.9:0;
    ctx.globalAlpha=alpha;ctx.strokeStyle=col;ctx.lineWidth=3;ctx.lineCap="round";
    ctx.beginPath();ctx.moveTo(x1,cy+dy+w);
    if(anim){const mx=(x1+x2)/2;ctx.bezierCurveTo(mx,cy+dy+w*1.6,mx,cy+dy+w*1.6,x2,cy+dy+(side==="L"?0:w));}
    else ctx.lineTo(x2,cy+dy);
    ctx.stroke();
    ctx.globalAlpha=alpha*.11;ctx.strokeStyle="#fff";ctx.lineWidth=.9;
    ctx.beginPath();ctx.moveTo(x1,cy+dy-.7+w);ctx.lineTo(x2,cy+dy-.7+(anim&&side==="R"?w:0));ctx.stroke();
  }
  ctx.restore();
}

function drawGapDots(ctx:CanvasRenderingContext2D,cx:number,cy:number,alpha:number,ts:number){
  ctx.save();
  for(let i=0;i<4;i++){
    const p=Math.sin(ts*.006+i*1.2)*.5+.5;
    ctx.globalAlpha=alpha*(.1+p*.7);ctx.fillStyle=GREEN;
    ctx.beginPath();ctx.arc(cx,cy-8+i*5.5,1.6,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}

function drawFlash(ctx:CanvasRenderingContext2D,cx:number,cy:number,fh:number,a:number){
  if(a<=0)return;
  ctx.save();
  const g=ctx.createRadialGradient(cx,cy,0,cx,cy,60);
  g.addColorStop(0,`rgba(2,169,87,${a*.12})`);g.addColorStop(.5,`rgba(22,60,140,${a*.08})`);g.addColorStop(1,"transparent");
  ctx.fillStyle=g;ctx.fillRect(cx-60,cy-fh/2+2,120,fh-4);ctx.restore();
}

function drawSeam(ctx:CanvasRenderingContext2D,cx:number,cy:number,fh:number,ts:number){
  const p=.05+Math.sin(ts*.004)*.025;
  ctx.save();ctx.globalAlpha=p;
  const g=ctx.createLinearGradient(cx-14,cy,cx+14,cy);
  g.addColorStop(0,"rgba(2,169,87,0)");g.addColorStop(.5,"rgba(2,169,87,1)");g.addColorStop(1,"rgba(2,169,87,0)");
  ctx.fillStyle=g;ctx.fillRect(cx-14,cy-fh/2+4,28,fh-8);ctx.restore();
}

interface IndustrialLoaderProps {
  forceShow?: boolean;
}

function SearchParamsWatcher({ onChange }: { onChange: () => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    onChange();
  }, [searchParams, onChange]);
  return null;
}

/* ── Component ── */
export default function IndustrialLoader({ forceShow = false }: IndustrialLoaderProps){
  const pathname=usePathname();
  const [visible,setVisible]=useState(forceShow);
  const [phase,setPhase]=useState(0);
  const [progress,setProgress]=useState(0);
  const [litN,setLitN]=useState(0);
  const [locked,setLocked]=useState(false);

  const cvRef=useRef<HTMLCanvasElement>(null);
  const rafRef=useRef<number|null>(null);
  const loopRef=useRef<number|null>(null);
  const bpRef=useRef<any[]>([]);
  useEffect(()=>{bpRef.current=buildBP(W/2,CY);},[]);

  const render=useCallback((ts:number)=>{
    if(!loopRef.current)loopRef.current=ts;
    const T=((ts-loopRef.current)%TOTAL_DUR)/TOTAL_DUR;
    const cv=cvRef.current;if(!cv)return;
    const ctx=cv.getContext("2d");if(!ctx)return;
    const cx=W/2,cy=CY,fw=76,fh=58,mw=76,mh=58;
    ctx.clearRect(0,0,W,H);
    const ph=getPhase(T);setPhase(ph);

    if(ph===0){
      const pt=clamp(T/.40,0,1);
      ctx.save();ctx.strokeStyle=GREEN;ctx.lineWidth=.8;ctx.globalAlpha=.7;
      bpRef.current.forEach(ln=>drawBPLine(ctx,ln,pt));ctx.restore();
      const dA=ez.out3(clamp((pt-.36)/.08,0,1));
      if(dA>0){
        dim(ctx,cx-128,cy-50,cx-52,"76.0",dA);dim(ctx,cx+52,cy-50,cx+128,"76.0",dA);
        ctx.save();ctx.globalAlpha=dA*.4;ctx.fillStyle=GREEN;ctx.font="7px 'Courier New',monospace";ctx.textAlign="left";
        ctx.fillText("FEMALE",cx-134,cy+46);ctx.fillText("MALE",cx+54,cy+46);ctx.restore();
      }
      setProgress(Math.round(pt*28));setLitN(0);setLocked(false);
    }
    if(ph===1){
      const pt=clamp((T-.38)/(.62-.38),0,1),ft=ez.out3(pt);
      const wA=ez.out3(clamp((pt-.2)/.5,0,1)),wn=Math.round(wA*6);
      drawWires(ctx,cx-100,cy,fw,"L",wn,wA,false,ts);drawWires(ctx,cx+100,cy,mw,"R",wn,wA,false,ts);
      drawHousing(ctx,cx-100,cy,fw,fh,"L",1,ft);drawLatch(ctx,cx-100,cy-fh/2,"L",1,ft,false);drawCavityFace(ctx,cx-100,cy,fw,0,1,ft);
      drawHousing(ctx,cx+100,cy,mw,mh,"R",1,ft);drawLatch(ctx,cx+100,cy-mh/2,"R",1,ft,false);drawPinFace(ctx,cx+100,cy,mw,0,1,ft);
      setProgress(Math.round(28+pt*24));setLitN(0);setLocked(false);
    }
    if(ph===2){
      const pt=ez.out3(clamp((T-.60)/(.76-.60),0,1));
      const fO=lerp(-100,-40,pt),mO=lerp(100,40,pt),n=Math.round(pt*2);
      drawWires(ctx,cx+fO,cy,fw,"L",6,.94,true,ts);drawWires(ctx,cx+mO,cy,mw,"R",6,.94,true,ts);
      drawHousing(ctx,cx+fO,cy,fw,fh,"L",1,1);drawLatch(ctx,cx+fO,cy-fh/2,"L",1,1,false);drawCavityFace(ctx,cx+fO,cy,fw,n,1,1);
      drawHousing(ctx,cx+mO,cy,mw,mh,"R",1,1);drawLatch(ctx,cx+mO,cy-mh/2,"R",1,1,false);drawPinFace(ctx,cx+mO,cy,mw,n,1,1);
      if(pt<.85)drawGapDots(ctx,cx,cy,1-pt/.85,ts);
      setProgress(Math.round(52+pt*22));setLitN(n);setLocked(false);
    }
    if(ph===3){
      const rawT=clamp((T-.74)/(.86-.74),0,1),pt=ez.back(rawT);
      const fO=lerp(-40,-19,pt),mO=lerp(40,19,pt);
      const fa=rawT<.15?ez.out3(rawT/.08)*(1-ez.out3(Math.max(0,rawT-.08)/.07)):0;
      drawWires(ctx,cx+fO,cy,fw,"L",6,.94,true,ts);drawWires(ctx,cx+mO,cy,mw,"R",6,.94,true,ts);
      drawHousing(ctx,cx+fO,cy,fw,fh,"L",1,1);drawLatch(ctx,cx+fO,cy-fh/2,"L",1,1,false);drawCavityFace(ctx,cx+fO,cy,fw,Math.min(6,Math.round(pt*6)),1,1);
      drawHousing(ctx,cx+mO,cy,mw,mh,"R",1,1);drawLatch(ctx,cx+mO,cy-mh/2,"R",1,1,pt>.6);drawPinFace(ctx,cx+mO,cy,mw,Math.min(6,Math.round(pt*6)),1,1);
      drawFlash(ctx,cx,cy,fh,fa);
      const n=Math.min(6,Math.round(pt*6));
      setProgress(Math.round(74+pt*20));setLitN(n);setLocked(pt>.7);
    }
    if(ph===4){
      drawWires(ctx,cx-19,cy,fw,"L",6,.94,true,ts);drawWires(ctx,cx+19,cy,mw,"R",6,.94,true,ts);
      drawHousing(ctx,cx-19,cy,fw,fh,"L",1,1);drawLatch(ctx,cx-19,cy-fh/2,"L",1,1,true);drawCavityFace(ctx,cx-19,cy,fw,6,1,1);
      drawHousing(ctx,cx+19,cy,mw,mh,"R",1,1);drawLatch(ctx,cx+19,cy-mh/2,"R",1,1,true);drawPinFace(ctx,cx+19,cy,mw,6,1,1);
      drawSeam(ctx,cx,cy,fh,ts);
      ctx.save();ctx.globalAlpha=.65;ctx.fillStyle=GREEN;ctx.font="bold 8px 'Courier New',monospace";ctx.textAlign="center";
      ctx.shadowColor=GREEN;ctx.shadowBlur=10;ctx.fillText("CIRCUIT COMPLETE",cx,cy+60);ctx.restore();
      setProgress(96);setLitN(6);setLocked(true);
    }
    if(ph===5){
      const pt=ez.io(clamp((T-.92)/.08,0,1)),a=1-pt;
      const fO=lerp(-19,-100,pt),mO=lerp(19,100,pt),n=Math.round((1-pt)*6);
      drawWires(ctx,cx+fO,cy,fw,"L",6,a,false,ts);drawWires(ctx,cx+mO,cy,mw,"R",6,a,false,ts);
      drawHousing(ctx,cx+fO,cy,fw,fh,"L",a,1);drawLatch(ctx,cx+fO,cy-fh/2,"L",a,1,false);drawCavityFace(ctx,cx+fO,cy,fw,n,a,1);
      drawHousing(ctx,cx+mO,cy,mw,mh,"R",a,1);drawLatch(ctx,cx+mO,cy-mh/2,"R",a,1,false);drawPinFace(ctx,cx+mO,cy,mw,n,a,1);
      setProgress(Math.round(96-pt*96));setLitN(n);setLocked(false);
    }
    rafRef.current=requestAnimationFrame(render);
  },[]);

  const startLoader=useCallback(()=>{setVisible(true);loopRef.current=null;if(rafRef.current)cancelAnimationFrame(rafRef.current);rafRef.current=requestAnimationFrame(render);},[render]);
  const stopLoader=useCallback(()=>{if(rafRef.current){cancelAnimationFrame(rafRef.current);rafRef.current=null;}setVisible(false);},[]);

  const handleParamsChange = useCallback(() => {
    if (!forceShow) {
      startLoader();
      const t = setTimeout(stopLoader, TOTAL_DUR);
      return () => clearTimeout(t);
    }
  }, [forceShow, startLoader, stopLoader]);

  useEffect(()=>{
    if(!forceShow) {
      startLoader();
      const t=setTimeout(stopLoader,TOTAL_DUR);
      return()=>clearTimeout(t);
    }
  },[pathname,startLoader,stopLoader,forceShow]);

  useEffect(()=>{
    const s=()=>startLoader();
    const e=()=>stopLoader();
    window.addEventListener("loader-start",s);window.addEventListener("loader-end",e);
    return()=>{window.removeEventListener("loader-start",s);window.removeEventListener("loader-end",e);};
  },[startLoader,stopLoader]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        !anchor.href.includes("#") &&
        anchor.target !== "_blank" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        const url = new URL(anchor.href);
        if (
          url.pathname !== window.location.pathname ||
          url.search !== window.location.search
        ) {
          startLoader();
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => window.removeEventListener("click", handleAnchorClick);
  }, [startLoader]);

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsWatcher onChange={handleParamsChange} />
      </Suspense>
    <AnimatePresence>
      {(visible || forceShow)&&(
        <motion.div
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.4}}}
          className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden"
          style={{background:"rgba(255,255,255,0.85)", backdropFilter:"blur(12px)", pointerEvents:"none"}}
        >
          {/* Main content */}
          <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
            {/* Canvas */}
            <div style={{position:"relative"}}>
              <canvas ref={cvRef} width={W} height={H} style={{display:"block",borderRadius:2,background:"transparent"}}/>
            </div>

            {/* Progress bar only */}
            <div style={{marginTop:20}}>
              <div style={{width:260,height:2,background:"rgba(22,60,140,.25)",borderRadius:1,overflow:"hidden",position:"relative"}}>
                <motion.div animate={{width:`${progress}%`}} transition={{duration:.45,ease:[.4,0,.2,1]}}
                  style={{height:"100%",background:`linear-gradient(90deg,${BLUE},${GREEN})`,position:"relative",overflow:"hidden",boxShadow:`0 0 8px ${GREEN}60`}}>
                  <motion.div animate={{x:["-100%","200%"]}} transition={{duration:1.4,repeat:Infinity,ease:"easeInOut"}}
                    style={{position:"absolute",inset:0,width:"40%",background:`linear-gradient(90deg,transparent,rgba(2,169,87,.6),transparent)`}}/>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

export const triggerLoader=(state:"start"|"end")=>{
  if(typeof window!=="undefined") window.dispatchEvent(new CustomEvent(`loader-${state}`));
};
