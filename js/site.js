/* ============================================================
   DMT WORLD — site engine
   ============================================================ */
(function(){
  "use strict";
  var CFG = window.DMT_CONFIG || {};
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- collection color themes ---------- */
  var THEMES = {
    "Machine Elves": ["#00FFA3","#18E0FF","#B026FF"],
    "Plant Medicine":["#00FFA3","#39FF14","#FFD447"],
    "Cosmic Comedy": ["#FF2BAE","#FFD447","#18E0FF"],
    "Activist":      ["#B026FF","#FF2BAE","#18E0FF"]
  };
  function teeArt(p){
    var c = THEMES[p.collection] || ["#FF2BAE","#B026FF","#18E0FF"];
    // procedural psychedelic background; real photo (assets/products/<id>.jpg) overrides if present
    return "background:" +
      "radial-gradient(circle at 30% 25%, "+c[0]+"55, transparent 45%)," +
      "radial-gradient(circle at 75% 70%, "+c[1]+"55, transparent 45%)," +
      "conic-gradient(from 0deg at 50% 50%, "+c[0]+"33, "+c[1]+"33, "+c[2]+"33, "+c[0]+"33)," +
      "#0B0420;";
  }

  /* ---------- NAV ---------- */
  function initNav(){
    var t = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if(t&&links){ t.addEventListener('click', function(){ links.classList.toggle('open'); }); }
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a[data-page]').forEach(function(a){
      if(a.getAttribute('data-page')===here) a.classList.add('active');
    });
  }

  /* ---------- FOOTER / config links ---------- */
  function wireLinks(){
    var L = CFG.links||{};
    document.querySelectorAll('[data-link]').forEach(function(a){
      var k=a.getAttribute('data-link'); if(L[k]) a.href=L[k];
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)||reduce){els.forEach(function(e){e.classList.add('in');});return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    els.forEach(function(e){io.observe(e);});
  }

  /* ---------- HYPERSPACE CANVAS ---------- */
  function initHyperspace(){
    var cv=document.getElementById('hyperspace'); if(!cv) return;
    var ctx=cv.getContext('2d'); var w,h,cx,cy,stars=[],N;
    var COLORS=['#FF2BAE','#18E0FF','#00FFA3','#B026FF','#FFD447'];
    function resize(){
      w=cv.width=innerWidth; h=cv.height=innerHeight; cx=w/2; cy=h/2;
      N=Math.min(560, Math.floor(w*h/2600));
      stars=[]; for(var i=0;i<N;i++) stars.push(mk());
    }
    function mk(){return{x:(Math.random()-.5)*w,y:(Math.random()-.5)*h,z:Math.random()*w,c:COLORS[(Math.random()*COLORS.length)|0]};}
    function frame(){
      ctx.fillStyle='rgba(5,1,13,.32)'; ctx.fillRect(0,0,w,h);
      for(var i=0;i<N;i++){
        var s=stars[i]; s.z-=2.4;
        if(s.z<1){s.x=(Math.random()-.5)*w;s.y=(Math.random()-.5)*h;s.z=w;}
        var k=128/s.z, x=cx+s.x*k, y=cy+s.y*k, r=(1-s.z/w)*2.4;
        var pz=s.z+2.4, px=cx+s.x*(128/pz), py=cy+s.y*(128/pz);
        ctx.strokeStyle=s.c; ctx.globalAlpha=Math.min(1,(1-s.z/w)*1.1); ctx.lineWidth=r;
        ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(x,y); ctx.stroke();
      }
      ctx.globalAlpha=1; requestAnimationFrame(frame);
    }
    addEventListener('resize',resize); resize();
    if(reduce){ // static field
      ctx.fillStyle='#05010D';ctx.fillRect(0,0,w,h);
      stars.forEach(function(s){var k=128/s.z;ctx.fillStyle=s.c;ctx.globalAlpha=.6;ctx.fillRect(cx+s.x*k,cy+s.y*k,1.6,1.6);});
      ctx.globalAlpha=1; return;
    }
    frame();
  }

  /* ---------- WINKING ELVES (random blink) ---------- */
  function initElves(){
    document.querySelectorAll('[data-elf-wink]').forEach(function(svg){
      function wink(){
        var lid=svg.querySelector('.wink-lid'); if(!lid) return;
        lid.style.transform='scaleY(1)';
        setTimeout(function(){lid.style.transform='scaleY(0)';},190);
        setTimeout(wink, 2200+Math.random()*3200);
      }
      setTimeout(wink, 800+Math.random()*1500);
    });
  }

  /* ---------- SHOP RENDER ---------- */
  function stockBadge(p){
    if(p.badge){
      var cls = p.badge==='Bestseller'?'hot':(/1 left/.test(p.badge)?'last':'');
      return '<span class="badge '+cls+'">'+p.badge+'</span>';
    }
    return '';
  }
  function cardHTML(p){
    var imgSrc=p.image||('assets/products/'+p.id+'.jpg');
    var hasImg=!!(p.image)||true; // attempt image; reveal name only if it fails
    return '<article class="card reveal" data-collection="'+p.collection+'">'+
      '<div class="art" style="'+teeArt(p)+'">'+stockBadge(p)+
        '<img src="'+imgSrc+'" alt="'+p.name+'" loading="lazy" onerror="this.remove();var n=this.parentNode.querySelector(\'.tee-name\');if(n)n.style.display=\'flex\'">'+
        '<div class="tee-name" style="display:none">'+p.name+'</div>'+
      '</div>'+
      '<div class="body">'+
        '<div class="coll-tag">'+p.collection+'</div>'+
        '<h3>'+p.name+'</h3>'+
        '<p class="blurb">'+p.blurb+'</p>'+
        '<div class="row"><span class="price">$'+p.price.toFixed(2)+'</span>'+
          '<span class="coll-tag">'+(p.tags[0]||'')+'</span></div>'+
        '<button class="btn btn-primary buy" data-id="'+p.id+'">View / Buy</button>'+
      '</div></article>';
  }
  function renderShop(){
    var grid=document.getElementById('shop-grid'); if(!grid||!window.DMT_PRODUCTS) return;
    var P=window.DMT_PRODUCTS;
    grid.innerHTML=P.map(cardHTML).join('');
    initReveal();
    // filters
    document.querySelectorAll('.chip').forEach(function(chip){
      chip.addEventListener('click',function(){
        document.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active');});
        chip.classList.add('active');
        var f=chip.getAttribute('data-filter');
        document.querySelectorAll('.card').forEach(function(card){
          card.style.display=(f==='all'||card.getAttribute('data-collection')===f)?'':'none';
        });
      });
    });
    // buy clicks
    grid.addEventListener('click',function(e){
      var b=e.target.closest('.buy'); if(!b) return;
      openModal(b.getAttribute('data-id'));
    });
    // preselect from ?c= collection
    var c=new URLSearchParams(location.search).get('c');
    if(c){var chip=document.querySelector('.chip[data-filter="'+c+'"]'); if(chip) chip.click();}
  }

  /* ---------- PRODUCT MODAL + CHECKOUT ---------- */
  function openModal(id){
    var p=(window.DMT_PRODUCTS||[]).find(function(x){return x.id===id;}); if(!p) return;
    var m=document.getElementById('modal'); if(!m) return;
    var checkout;
    if(CFG.stripeEnabled && CFG.stripePublishableKey && p.stripeBuyButtonId){
      checkout='<div class="stripe-slot"><stripe-buy-button buy-button-id="'+p.stripeBuyButtonId+
        '" publishable-key="'+CFG.stripePublishableKey+'"></stripe-buy-button></div>';
    } else {
      checkout='<a class="btn btn-primary buy" style="width:100%;justify-content:center" href="'+p.etsyUrl+
        '" target="_blank" rel="noopener">Buy on Etsy — $'+p.price.toFixed(2)+'</a>'+
        '<p class="note">Secure checkout via our Etsy store (10k+ orders · 4.8★). Stripe one-click checkout activates here once keys are added in config.js.</p>';
    }
    m.querySelector('.modal-box').innerHTML=
      '<div class="modal-art" style="'+teeArt(p)+'">'+
        '<button class="modal-close" aria-label="close">&times;</button>'+
        '<img src="'+(p.image||('assets/products/'+p.id+'.jpg'))+'" alt="'+p.name+'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1" onerror="this.remove();var n=this.parentNode.querySelector(\'.tee-name\');if(n)n.style.display=\'flex\'">'+
        '<div class="tee-name" style="display:none">'+p.name+'</div></div>'+
      '<div class="modal-body">'+
        '<div class="coll-tag">'+p.collection+' · '+(p.badge||'In stock')+'</div>'+
        '<h2>'+p.name+'</h2>'+
        '<p class="blurb">'+p.blurb+'</p>'+
        checkout+
      '</div>';
    m.classList.add('open');
    m.querySelector('.modal-close').addEventListener('click',closeModal);
  }
  function closeModal(){var m=document.getElementById('modal');if(m)m.classList.remove('open');}
  function initModal(){
    var m=document.getElementById('modal'); if(!m) return;
    m.addEventListener('click',function(e){if(e.target===m)closeModal();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});
  }

  /* ---------- FEATURED (home) ---------- */
  function renderFeatured(){
    var grid=document.getElementById('featured-grid'); if(!grid||!window.DMT_PRODUCTS) return;
    var picks=['i-like-plants-t-shirt','youniverse','as-seen-on-dmt','colorful-dmt-molecule-shirt','otter-body-experience','terence-creation','drop-acid-not-bombs','fun-guy-shirt'];
    var P=window.DMT_PRODUCTS.filter(function(p){return picks.indexOf(p.id)>-1;});
    grid.innerHTML=P.map(cardHTML).join('');
    grid.addEventListener('click',function(e){var b=e.target.closest('.buy');if(b)openModal(b.getAttribute('data-id'));});
    initReveal();
  }

  /* ---------- LIVE PAGE ---------- */
  function initLive(){
    var root=document.getElementById('live-root'); if(!root) return;
    var lv=CFG.live||{};
    var url = lv.platform==='tiktok' ? lv.tiktokUrl : lv.whatnotUrl;
    var name = lv.platform==='tiktok' ? 'TikTok LIVE' : 'Whatnot';
    document.querySelectorAll('[data-live-cta]').forEach(function(a){a.href=url||'#';
      a.textContent = (lv.isLiveNow?'Join the Live Drop on ':'Get Notified on ')+name;});
    // badge
    var badge=document.getElementById('live-badge');
    if(badge){
      if(lv.isLiveNow){badge.classList.remove('off');badge.querySelector('.txt').textContent='Live now — '+name;}
      else{badge.classList.add('off');badge.querySelector('.txt').textContent='Offline — next drop below';}
    }
    // countdown
    var cd=document.getElementById('countdown');
    if(cd && lv.nextShowISO){
      var target=new Date(lv.nextShowISO).getTime();
      function tick(){
        var d=target-Date.now(); if(isNaN(target)||d<0){cd.style.display='none';return;}
        var day=Math.floor(d/864e5),hr=Math.floor(d%864e5/36e5),mn=Math.floor(d%36e5/6e4),sc=Math.floor(d%6e4/1e3);
        cd.innerHTML=[[day,'Days'],[hr,'Hours'],[mn,'Min'],[sc,'Sec']].map(function(u){
          return '<div class="cd"><b>'+String(u[0]).padStart(2,'0')+'</b><span>'+u[1]+'</span></div>';}).join('');
      }
      tick(); if(!reduce) setInterval(tick,1000);
    } else if(cd){ cd.style.display='none'; }
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded',function(){
    initNav(); wireLinks(); initHyperspace(); initModal();
    renderFeatured(); renderShop(); initLive(); initReveal();
  });
})();
