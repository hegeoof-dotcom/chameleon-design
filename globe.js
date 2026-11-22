/* Chameleon VPN — точечная планета (общая для заставки и главной).
   CGlobe.draw — одна отрисовка; CGlobe.hero(canvas) — живая планета с дугами-подключениями. */
(function(){
const RAD=Math.PI/180;
const ll=(la,lo)=>{const y=la*RAD,x=lo*RAD;return[Math.cos(y)*Math.cos(x),Math.sin(y),Math.cos(y)*Math.sin(x)];};
const CONT=[
[[70,-140],[72,-125],[68,-100],[65,-85],[55,-65],[45,-60],[35,-75],[25,-80],[18,-88],[10,-83],[10,-77],[15,-93],[20,-105],[25,-110],[32,-117],[40,-124],[48,-124],[55,-130],[58,-137],[65,-140]],
[[12,-72],[8,-60],[3,-50],[0,-50],[-5,-35],[-15,-39],[-23,-43],[-35,-57],[-42,-63],[-52,-70],[-55,-66],[-50,-73],[-42,-73],[-25,-70],[-15,-75],[-5,-80],[0,-78],[8,-77]],
[[36,28],[40,27],[42,22],[45,13],[43,7],[47,5],[51,-2],[51,4],[55,8],[58,12],[60,11],[63,14],[68,18],[70,25],[68,28],[60,25],[55,22],[54,18],[57,15],[54,14],[52,15],[48,17],[46,16],[43,16],[40,18],[36,14]],
[[37,10],[37,12],[36,15],[30,32],[22,37],[12,44],[5,41],[0,42],[-5,40],[-10,40],[-20,35],[-35,27],[-34,18],[-17,12],[-5,9],[0,9],[5,3],[4,10],[8,3],[5,-5],[4,-7],[10,-17],[14,-17],[20,-17],[28,-12]],
[[10,78],[22,88],[28,97],[20,110],[8,100],[1,104],[8,98],[16,97],[22,92],[28,87],[30,80],[35,78],[35,72],[45,60],[50,58],[55,62],[60,60],[65,55],[68,58],[73,68],[70,80],[68,90],[70,100],[73,110],[72,140],[68,162],[65,165],[60,165],[52,142],[45,135],[40,122],[35,120],[30,122],[22,108]],
[[-15,128],[-10,136],[-12,142],[-18,148],[-24,152],[-32,152],[-38,147],[-38,140],[-38,130],[-34,122],[-28,114],[-22,114],[-17,122]],
[[82,-22],[82,-45],[76,-65],[70,-50],[64,-50],[60,-44],[62,-42],[65,-38],[72,-24],[76,-18],[80,-20]]];
const NODES=[[51.5,-.1],[48.8,2.35],[55.7,37.6],[40.7,-74],[34,-118],[35.6,139.7],[1.3,103.8],[39.9,116.4],[28.6,77.2],[50.4,30.5],[41,29],[59.9,30.3]];
const pts=[];
if(window.CLAND){
  // настоящие материки (Natural Earth): берег — яркие точки, суша — мягкая заливка
  const dec=str=>{const a=str.split(',').map(Number),o=[];for(let i=0;i<a.length;i+=2)o.push([a[i]/10,a[i+1]/10]);return o;};
  dec(CLAND.coast).forEach(([la,lo])=>{const[x,y,z]=ll(la,lo);pts.push({x,y,z,t:0,s:.55+Math.random()*.6,j:Math.random()});});
  dec(CLAND.fill).forEach(([la,lo])=>{const[x,y,z]=ll(la,lo);pts.push({x,y,z,t:1,s:.55+Math.random()*.35,j:Math.random()});});
}else{
CONT.forEach(c=>{for(let i=0;i<c.length;i++){const a=c[i],b=c[(i+1)%c.length];const n=Math.max(2,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/2));
  for(let t=0;t<n;t++){const f=t/n,la=a[0]+(b[0]-a[0])*f,lo=a[1]+(b[1]-a[1])*f;const[x,y,z]=ll(la,lo);pts.push({x,y,z,t:0,s:.5+Math.random()*.9,j:Math.random()});
    if(Math.random()<.4){const[sx,sy,sz]=ll(la+(Math.random()-.5)*7,lo+(Math.random()-.5)*7);pts.push({x:sx,y:sy,z:sz,t:1,s:.15+Math.random()*.45,j:Math.random()});}}}});
}
NODES.forEach(([la,lo])=>{const[x,y,z]=ll(la,lo);pts.push({x,y,z,t:2,s:2.2+Math.random()*.8,j:Math.random()});});
const phi=Math.PI*(3-Math.sqrt(5));
for(let i=0;i<120;i++){const yy=1-(i/119)*2,r=Math.sqrt(1-yy*yy),tt=phi*i;pts.push({x:Math.cos(tt)*r,y:yy,z:Math.sin(tt)*r,t:3,s:.12+Math.random()*.25,j:Math.random()});}

const TILT=.42,cT=Math.cos(TILT),sT=Math.sin(TILT);
// проекция: север вверху, восток справа (в старой заставке планета была повёрнута на 180°)
function proj(x,y,z,cA,sA){const rx=x*cA+z*sA,rz=-x*sA+z*cA;const ty=y*cT-rz*sT,tz=y*sT+rz*cT;return[-rx,-ty,tz];}
const ease=t=>1-Math.pow(1-t,3);
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));

/* o: {cx,cy,R,ang,scan,alpha=1,reveal=1,dotScale=1} */
function draw(ctx,o){
  const{cx,cy,R,ang,scan}=o,alpha=o.alpha??1,reveal=o.reveal??1,ds=o.dotScale??1;
  if(R<.5||alpha<=0)return;
  const cA=Math.cos(ang),sA=Math.sin(ang),cS=Math.cos(scan),sS=Math.sin(scan);
  ctx.save();ctx.globalAlpha=alpha;
  // атмосфера; при появлении — кольцо дорисовывается по кругу
  const rim=ctx.createRadialGradient(cx,cy,R*.82,cx,cy,R*1.1);
  rim.addColorStop(0,'rgba(252,18,34,0)');rim.addColorStop(.75,`rgba(252,18,34,${.06*reveal})`);rim.addColorStop(1,'rgba(252,18,34,0)');
  ctx.beginPath();ctx.arc(cx,cy,R*1.1,0,Math.PI*2);ctx.fillStyle=rim;ctx.fill();
  if(reveal<1){const a0=-Math.PI/2;ctx.beginPath();ctx.arc(cx,cy,R*1.005,a0,a0+Math.PI*2*ease(clamp(reveal*1.4)));
    ctx.strokeStyle=`rgba(252,18,34,${.5*(1-reveal)})`;ctx.lineWidth=1;ctx.stroke();}
  const pr=[];
  for(const p of pts){
    const[px,py,tz]=proj(p.x,p.y,p.z,cA,sA);
    if(tz<=-.05)continue;
    let ra=1;
    if(reveal<1){const d=Math.hypot(px,py);ra=clamp((reveal*1.5-d*.9-p.j*.25)/.25);if(ra<=0)continue;}
    pr.push({sx:cx+px*R,sy:cy+py*R,sc:(tz+1.5)/2.5,s:p.s,t:p.t,ra,beam:Math.max(0,(p.x*cS+p.z*sS-.965)*28),lit:Math.max(0,.45-py*.55)});
  }
  pr.sort((a,b)=>a.t===2?1:b.t===2?-1:0); // узлы поверх, остальное без сортировки — быстрее
  const k=R/120;
  for(const p of pr){
    const{sc,s,t,beam,lit,ra}=p;let a,sz;
    if(t===0){a=Math.pow(sc,1.1)*.9*lit+beam*.45;sz=s*sc*1.3;}
    else if(t===1){a=(window.CLAND?.3:.55)*Math.pow(sc,1.9)*lit+beam*.2;sz=s*sc;}
    else if(t===2){a=sc*.95;sz=s*Math.max(.5,sc);
      // узел: при появлении «хлопает» кольцом
      const pop=ra<1?1+(1-ra)*2.2:1;
      if(sc>.3){ctx.beginPath();ctx.arc(p.sx,p.sy,sz*5*pop*Math.max(.6,k),0,Math.PI*2);ctx.fillStyle=`rgba(252,18,34,${sc*.07*ra})`;ctx.fill();
        ctx.beginPath();ctx.arc(p.sx,p.sy,sz*2.2*Math.max(.6,k),0,Math.PI*2);ctx.fillStyle=`rgba(252,18,34,${sc*.22*ra})`;ctx.fill();}}
    else{a=Math.pow(sc,3.2)*.12+beam*.04;sz=s*sc*.55;}
    sz*=ds*Math.max(.6,Math.min(1.3,k));
    a*=ra;
    if(!sz||sz<.06||a<.012)continue;
    ctx.fillStyle=`rgba(252,18,34,${Math.min(1,a)})`;
    if(sz<1.3){const d=Math.max(.5,sz*1.7);ctx.fillRect(p.sx-d/2,p.sy-d/2,d,d);}
    else{ctx.beginPath();ctx.arc(p.sx,p.sy,sz,0,Math.PI*2);ctx.fill();}
  }
  ctx.restore();
}

// ================== ГЛАВНАЯ: планета с дугами ==================
const HUB=[55.75,37.62]; // откуда идут линии (пользователь)
const TARGETS=[[52.23,21.01],[50.11,8.68],[52.37,4.9],[60.17,24.94],[41.01,28.98],[43.24,76.89],[51.5,-.12],[40.71,-74],[43.65,-79.38],[34.05,-118.24],[-23.55,-46.63],[-34.6,-58.38],[-33.92,18.42],[30.04,31.24],[6.52,3.38],[19.08,72.88],[25.2,55.27],[1.35,103.82],[35.68,139.69],[37.57,126.98],[-33.87,151.21],[64.13,-21.9],[38.72,-9.14],[55.01,82.93],[62.03,129.73],[39.9,116.4],[13.75,100.5],[-1.29,36.82]];
function slerp(a,b,f){const d=Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2])),w=Math.acos(d);if(w<1e-4)return a.slice();
  const s=Math.sin(w),k1=Math.sin((1-f)*w)/s,k2=Math.sin(f*w)/s;return[a[0]*k1+b[0]*k2,a[1]*k1+b[1]*k2,a[2]*k1+b[2]*k2];}

function hero(canvas,opts={}){
  const ctx=canvas.getContext('2d');
  const DPR=Math.min(devicePixelRatio||1,2);
  let W=0,H=0,R=0,cx=0,cy=0;
  let ang=-0.9,vel=-.0016,scan=0,run=false,raf=0,last=0,born=performance.now();
  let mode=opts.mode||'on';
  const arcs=[],rings=[];
  let nextArc=0;
  function size(){const r=canvas.getBoundingClientRect();W=r.width;H=r.height;canvas.width=W*DPR;canvas.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
    R=Math.min(W*.41,H*.42);cx=W/2;cy=H*.5;}
  function spawn(fromHub){
    const cA=Math.cos(ang),sA=Math.sin(ang);
    const front=v=>proj(...v,cA,sA)[2];
    const pick=()=>{let best=null;for(let i=0;i<8;i++){const c=ll(...TARGETS[Math.random()*TARGETS.length|0]);if(front(c)>.15)return c;best=c;}return best;};
    const hub=fromHub??Math.random()<.55;
    let a=hub?ll(...HUB):pick(),b=pick();
    for(let i=0;i<6;i++){const d=a[0]*b[0]+a[1]*b[1]+a[2]*b[2];if(d<.97)break;b=pick();}
    const w=Math.acos(Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2])));
    const n=Math.max(22,Math.round(w*70));
    const path=[];for(let i=0;i<=n;i++){const f=i/n,p=slerp(a,b,f),h=1+Math.sin(Math.PI*f)*(.08+w*.24);path.push([p[0]*h,p[1]*h,p[2]*h]);}
    arcs.push({path,b,t0:performance.now(),dur:700+w*500,hit:false});
  }
  function frame(now){
    if(!run)return;
    const dt=Math.min(50,now-(last||now));last=now;
    ctx.clearRect(0,0,W,H);
    // вращение с инерцией
    if(!drag){vel+=(-.0016-vel)*.02;}
    ang+=vel*dt/16;scan+=.007*dt/16;
    const intro=Math.min(1,(now-born)/1100);
    const on=mode==='on',baseA=on?1:.55;
    draw(ctx,{cx,cy,R,ang,scan,alpha:baseA,reveal:ease(intro)});
    const cA=Math.cos(ang),sA=Math.sin(ang);
    // новые дуги
    if(now>nextArc&&intro>.8){spawn();nextArc=now+(on?520+Math.random()*520:1500+Math.random()*900);}
    const col=on?'252,18,34':'214,229,226';
    for(let i=arcs.length-1;i>=0;i--){
      const A=arcs[i],life=(now-A.t0)/A.dur;
      const head=ease(Math.min(1,life)),tail=Math.max(0,ease(Math.min(1,Math.max(0,life-.35)/1)));
      const fade=life>1?Math.max(0,1-(life-1)/1.6):1;
      if(fade<=0){arcs.splice(i,1);continue;}
      const n=A.path.length-1;
      for(let j=0;j<=n;j++){
        const f=j/n;if(f>head)break;
        const[px,py,tz]=proj(...A.path[j],cA,sA);
        const back=tz<-.02?.12:1;
        // светящаяся «голова» и затухающий след; после попадания линия остаётся пунктиром и гаснет
        const inTrail=f>=tail-.001;
        let a=inTrail?(.25+.75*Math.pow((f-tail)/Math.max(.001,head-tail),2)):.22*fade;
        if(!inTrail&&j%2)continue;
        a*=back*(on?1:.5);
        const isHead=f>head-.03&&life<1;const sz=(inTrail?1.45:1)*(.75+R/180)*(isHead?1.7:1);
        if(isHead){ctx.beginPath();ctx.arc(cx+px*R,cy+py*R,sz*4,0,Math.PI*2);ctx.fillStyle=`rgba(${col},${.16*back})`;ctx.fill();}
        ctx.beginPath();ctx.arc(cx+px*R,cy+py*R,sz,0,Math.PI*2);ctx.fillStyle=`rgba(${col},${a})`;ctx.fill();
      }
      if(!A.hit&&life>=1){A.hit=true;rings.push({p:A.b,t0:now});opts.onHit&&opts.onHit();}
    }
    // «бумс»: кольцо в точке попадания
    for(let i=rings.length-1;i>=0;i--){
      const g=rings[i],l=(now-g.t0)/900;if(l>=1){rings.splice(i,1);continue;}
      const[px,py,tz]=proj(...g.p,cA,sA);if(tz<0)continue;
      const x=cx+px*R,y=cy+py*R,e=ease(l);
      ctx.beginPath();ctx.arc(x,y,3+e*R*.13,0,Math.PI*2);ctx.strokeStyle=`rgba(${col},${(1-l)*.8})`;ctx.lineWidth=1.2;ctx.stroke();
      ctx.beginPath();ctx.arc(x,y,2.4*(1-l)+1.2,0,Math.PI*2);ctx.fillStyle=`rgba(255,${on?70:230},${on?80:235},${1-l*.7})`;ctx.fill();
      ctx.beginPath();ctx.arc(x,y,10*(1-l*.5),0,Math.PI*2);ctx.fillStyle=`rgba(${col},${.12*(1-l)})`;ctx.fill();
    }
    // точка пользователя
    {const[px,py,tz]=proj(...ll(...HUB),cA,sA);if(tz>0){const x=cx+px*R,y=cy+py*R,pl=(Math.sin(now/420)+1)/2;
      ctx.beginPath();ctx.arc(x,y,6+pl*6,0,Math.PI*2);ctx.fillStyle=`rgba(${col},${.10+.08*(1-pl)})`;ctx.fill();
      ctx.beginPath();ctx.arc(x,y,2.6,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
      ctx.beginPath();ctx.arc(x,y,2.6,0,Math.PI*2);ctx.strokeStyle=`rgba(${col},.9)`;ctx.lineWidth=1.4;ctx.stroke();}}
    raf=requestAnimationFrame(frame);
  }
  // крутить пальцем
  let drag=false,px0=0;
  canvas.addEventListener('pointerdown',e=>{drag=true;px0=e.clientX;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-px0;px0=e.clientX;vel=-dx*.0022;ang+=-dx*.006;});
  const up=()=>{if(drag){drag=false;}};
  canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
  canvas.addEventListener('click',()=>{for(let i=0;i<3;i++)setTimeout(()=>spawn(),i*110);opts.onTap&&opts.onTap();});
  const ro=new ResizeObserver(size);ro.observe(canvas);size();
  return{
    start(){if(run)return;run=true;last=0;raf=requestAnimationFrame(frame);},
    stop(){run=false;cancelAnimationFrame(raf);},
    replayIntro(){born=performance.now();},
    skipIntro(){born=performance.now()-5000;},
    setMode(m){mode=m;},
    getAngle(){return ang;},setAngle(a){ang=a;},
    burst(n=4){for(let i=0;i<n;i++)setTimeout(()=>spawn(),i*140);}
  };
}
window.CGlobe={draw,hero,ll};
})();
