/* ============================================================
   DMT WORLD — Self-Transforming Machine Elf (Earth-headed)
   A jeweled, fractal, iridescent hyperspace entity whose face
   is a spinning Earth. Injected into every [data-elf] container.
   ============================================================ */
(function(){
  "use strict";
  var NS="http://www.w3.org/2000/svg";

  function rot(deg){ return 'rotate('+deg+' 120 120)'; }

  function petals(count,inner,mid,wid,R,cls,fill,op){
    var s='';
    for(var i=0;i<count;i++){
      var a=i*(360/count);
      s+='<path transform="'+rot(a)+'" d="M120 '+(120-inner)+' Q '+(120-wid)+' '+(120-mid)+' 120 '+(120-R)+
         ' Q '+(120+wid)+' '+(120-mid)+' 120 '+(120-inner)+' Z" fill="'+fill+'" opacity="'+op+'"/>';
    }
    return '<g class="'+cls+'">'+s+'</g>';
  }

  function petalStroke(count,wid,R,col,op){
    var s='';
    for(var i=0;i<count;i++){
      var a=i*(360/count);
      s+='<path transform="'+rot(a)+'" d="M120 92 Q '+(120-wid)+' '+(120-R/2)+' 120 '+(120-R)+
         ' Q '+(120+wid)+' '+(120-R/2)+' 120 92 Z" fill="none" stroke="'+col+'" stroke-width="1" opacity="'+op+'"/>';
    }
    return s;
  }

  function ringPaths(count,inner,mid,wid,R,fill,op){
    return petals(count,inner,mid,wid,R,'',fill,op).replace('<g class="">','').replace(/<\/g>$/,'');
  }

  function ring(count,r,shape){
    var s='';
    for(var i=0;i<count;i++){
      var a=i*(360/count)*Math.PI/180, x=120+Math.cos(a)*r, y=120+Math.sin(a)*r;
      s+=shape(x,y,i);
    }
    return s;
  }

  function continents(dx){
    var land='#2FAE5C', desert='#CFA64C', forest='#1C6B3A';
    return '<g transform="translate('+dx+' 0)">'+
      '<g fill="'+land+'" stroke="#0E3D22" stroke-width="0.4" stroke-linejoin="round">'+
        '<path d="M78 88 Q82 84 90 85 Q98 84 100 90 Q104 92 101 97 Q103 102 97 104 Q98 110 92 110 Q90 116 86 116 Q84 112 85 108 Q80 106 80 100 Q76 96 78 92 Z"/>'+
        '<path d="M92 110 Q96 114 95 120 Q93 122 91 118 Q90 114 92 110 Z"/>'+
        '<path d="M104 84 Q110 82 111 88 Q112 93 106 93 Q102 92 102 88 Q102 85 104 84 Z"/>'+
        '<path d="M96 120 Q104 119 106 126 Q108 132 103 138 Q104 146 99 152 Q97 158 95 153 Q93 146 95 140 Q92 134 94 128 Q93 123 96 120 Z"/>'+
        '<path d="M108 100 Q110 99 110 102 Q109 104 108 102 Z"/>'+
        '<path d="M112 98 Q118 95 120 99 Q124 99 123 103 Q119 104 116 103 Q113 105 112 102 Q110 100 112 98 Z"/>'+
        '<path d="M114 106 Q124 104 130 110 Q133 114 130 118 Q132 122 128 124 Q128 130 124 134 Q124 142 120 148 Q117 150 116 144 Q114 136 116 130 Q112 124 113 118 Q110 112 114 106 Z"/>'+
        '<path d="M133 132 Q136 134 135 140 Q133 142 132 138 Q131 134 133 132 Z"/>'+
        '<path d="M126 100 Q138 92 152 94 Q162 94 163 100 Q165 106 158 108 Q150 110 144 108 Q146 114 140 114 Q138 110 134 110 Q130 112 128 108 Q124 104 126 100 Z"/>'+
        '<path d="M128 110 Q133 110 134 116 Q133 120 129 118 Q126 114 128 110 Z"/>'+
        '<path d="M138 112 Q143 112 144 118 Q143 124 139 126 Q137 121 137 116 Q137 113 138 112 Z"/>'+
        '<path d="M148 112 Q152 112 152 117 Q150 121 147 119 Q146 115 148 112 Z"/>'+
        '<path d="M150 144 Q158 142 162 147 Q165 151 161 155 Q156 158 151 155 Q147 151 150 144 Z"/>'+
        '<circle cx="160" cy="103" r="1.6"/><circle cx="163" cy="106" r="1.3"/>'+
        '<circle cx="150" cy="126" r="1.8"/><circle cx="155" cy="129" r="1.5"/><circle cx="159" cy="132" r="1.4"/><circle cx="157" cy="160" r="1.3"/>'+
      '</g>'+
      '<g fill="'+desert+'" opacity="0.92">'+
        '<path d="M115 110 Q124 108 130 112 Q131 116 126 117 Q118 118 115 115 Q113 113 115 110 Z"/>'+
        '<path d="M153 147 Q159 146 160 150 Q159 153 155 152 Q152 150 153 147 Z"/>'+
        '<path d="M82 100 Q86 99 87 102 Q86 105 83 104 Q81 102 82 100 Z"/>'+
        '<path d="M146 99 Q152 98 154 102 Q152 105 148 104 Q145 102 146 99 Z"/>'+
      '</g>'+
      '<g fill="'+forest+'" opacity="0.5">'+
        '<path d="M96 126 Q102 125 103 131 Q101 136 97 135 Q95 130 96 126 Z"/>'+
        '<path d="M118 122 Q124 121 125 126 Q123 130 119 129 Z"/>'+
      '</g>'+
    '</g>';
  }

  function crownStr(){
    var crown='', spec=[[-44,'#FF2BAE'],[-22,'#18E0FF'],[0,'#FFD447'],[22,'#00FFA3'],[44,'#B026FF']];
    for(var i=0;i<spec.length;i++){
      var a=spec[i][0], col=spec[i][1];
      crown+='<g class="bell" style="--d:'+(i*0.4)+'s">'+
        '<path transform="'+rot(a)+'" d="M114 76 L120 38 L126 76 Z" fill="'+col+'" opacity="0.9"/>'+
        '<circle transform="'+rot(a)+'" cx="120" cy="36" r="5" fill="'+col+'"/>'+
        '<circle transform="'+rot(a)+'" cx="120" cy="36" r="9" fill="none" stroke="'+col+'" stroke-width="1" opacity="0.5"/>'+
      '</g>';
    }
    return crown;
  }

  function svg(uid){
    return '<svg data-elf-wink="1" viewBox="0 0 240 240" xmlns="'+NS+'" role="img" aria-label="Self-transforming machine elf with an Earth face">'+
      '<defs>'+
        '<linearGradient id="iri'+uid+'" x1="0" y1="0" x2="1" y2="1">'+
          '<stop offset="0" stop-color="#FF2BAE"/><stop offset="0.33" stop-color="#B026FF"/>'+
          '<stop offset="0.66" stop-color="#18E0FF"/><stop offset="1" stop-color="#00FFA3"/>'+
        '</linearGradient>'+
        '<radialGradient id="ocean'+uid+'" cx="40%" cy="36%" r="72%">'+
          '<stop offset="0" stop-color="#3BC6F2"/><stop offset="0.5" stop-color="#1E72FF"/><stop offset="1" stop-color="#0A2E6E"/>'+
        '</radialGradient>'+
        '<radialGradient id="term'+uid+'" cx="38%" cy="34%" r="80%">'+
          '<stop offset="0" stop-color="#000814" stop-opacity="0"/><stop offset="0.7" stop-color="#000814" stop-opacity="0"/>'+
          '<stop offset="1" stop-color="#001029" stop-opacity="0.6"/>'+
        '</radialGradient>'+
        '<linearGradient id="shine'+uid+'" x1="0" y1="0" x2="1" y2="0">'+
          '<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.4"/>'+
          '<stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'+
        '<clipPath id="clip'+uid+'"><circle cx="120" cy="122" r="46"/></clipPath>'+
      '</defs>'+
      '<g class="elf-breathe">'+
        petals(12,8,60,30,104,'halo-ccw iris-hue','none',1)+
        '<g class="halo-ccw iris-hue">'+ringPaths(12,8,46,18,104,'url(#iri'+uid+')',0.16)+'</g>'+
        '<g class="halo-cw">'+petalStroke(8,30,86,'#B026FF',0.5)+'</g>'+
        '<circle cx="120" cy="120" r="98" fill="none" stroke="#18E0FF" stroke-width="0.6" opacity="0.4" class="halo-cw"/>'+
        '<g class="orbit">'+
          ring(8,100,function(x,y,i){
            var c=['#FF2BAE','#18E0FF','#00FFA3','#FFD447','#B026FF'][i%5];
            return '<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')"><path d="M0 -5 L1.6 -1.6 L5 0 L1.6 1.6 L0 5 L-1.6 1.6 L-5 0 L-1.6 -1.6 Z" fill="'+c+'"/></g>';
          })+
        '</g>'+
        crownStr()+
        '<circle cx="120" cy="122" r="47" fill="url(#ocean'+uid+')" stroke="url(#iri'+uid+')" stroke-width="2.5"/>'+
        '<g clip-path="url(#clip'+uid+')">'+
          '<g class="globe-spin">'+continents(0)+continents(92)+'</g>'+
          '<path d="M74 88 Q120 78 166 88 Q120 99 74 88 Z" fill="#EAF4FB" opacity="0.85"/>'+
          '<path d="M74 156 Q120 170 166 156 Q120 149 74 156 Z" fill="#EAF4FB" opacity="0.9"/>'+
          '<circle cx="120" cy="122" r="46" fill="url(#term'+uid+')"/>'+
          '<ellipse cx="104" cy="106" rx="13" ry="8" fill="#fff" opacity="0.12"/>'+
          '<rect class="shimmer" x="58" y="74" width="24" height="96" fill="url(#shine'+uid+')"/>'+
        '</g>'+
        '<circle cx="120" cy="122" r="46.5" fill="none" stroke="#18E0FF" stroke-width="1.2" opacity="0.55"/>'+
        '<circle cx="120" cy="122" r="47" fill="none" stroke="url(#iri'+uid+')" stroke-width="2.2" class="iris-hue"/>'+
        '<path d="M92 132 q-8 6 -2 14 q4 5 9 1" fill="none" stroke="#FFD447" stroke-width="1.3" opacity="0.8" class="iris-hue"/>'+
        '<path d="M148 132 q8 6 2 14 q-4 5 -9 1" fill="none" stroke="#FFD447" stroke-width="1.3" opacity="0.8" class="iris-hue"/>'+
        '<g class="pulse-gem"><path d="M120 96 l7 8 l-7 8 l-7 -8 Z" fill="#FFD447"/>'+
          '<path d="M120 99 l4 5 l-4 5 l-4 -5 Z" fill="#fff" opacity="0.85"/></g>'+
        '<g class="elf-eye" data-eye="l">'+
          '<ellipse cx="104" cy="120" rx="12" ry="14" fill="#0B0420" stroke="#18E0FF" stroke-width="1.2"/>'+
          '<path d="M104 113 l6 7 l-6 7 l-6 -7 Z" fill="url(#iri'+uid+')"/>'+
          '<circle cx="106" cy="117" r="2" fill="#fff"/>'+
        '</g>'+
        '<path class="elf-lid" data-lid="l" d="M91 119 Q104 127 117 119" fill="none" stroke="#18E0FF" stroke-width="2.4" stroke-linecap="round" style="opacity:0"/>'+
        '<g class="elf-eye" data-eye="r">'+
          '<ellipse cx="136" cy="120" rx="12" ry="14" fill="#0B0420" stroke="#FF2BAE" stroke-width="1.2"/>'+
          '<path d="M136 113 l6 7 l-6 7 l-6 -7 Z" fill="url(#iri'+uid+')"/>'+
          '<circle cx="138" cy="117" r="2" fill="#fff"/>'+
        '</g>'+
        '<path class="elf-lid" data-lid="r" d="M123 119 Q136 127 149 119" fill="none" stroke="#FF2BAE" stroke-width="2.4" stroke-linecap="round" style="opacity:0"/>'+
        '<path d="M100 144 Q120 168 142 142" fill="none" stroke="#FF2BAE" stroke-width="4" stroke-linecap="round"/>'+
        '<path d="M108 150 Q120 160 132 149" fill="none" stroke="#00FFA3" stroke-width="2" stroke-linecap="round"/>'+
      '</g>'+
    '</svg>';
  }

  function blink(svgEl){
    if(!svgEl) return;
    var eyes={ l:svgEl.querySelector('[data-eye="l"]'), r:svgEl.querySelector('[data-eye="r"]') };
    var lids={ l:svgEl.querySelector('[data-lid="l"]'), r:svgEl.querySelector('[data-lid="r"]') };
    if(!eyes.r) return;
    function set(which,closing){
      which.forEach(function(k){
        var e=eyes[k], l=lids[k];
        if(e){ e.style.transition='transform '+(closing?'.075s cubic-bezier(.45,0,.7,1)':'.16s cubic-bezier(.2,.7,.3,1)');
               e.style.transform=closing?'scaleY(0.05)':'scaleY(1)'; }
        if(l){ l.style.transition='opacity '+(closing?'.05s':'.14s'); l.style.opacity=closing?'1':'0'; }
      });
    }
    function one(which,hold,done){ set(which,true); setTimeout(function(){ set(which,false); if(done)setTimeout(done,170); },hold); }
    function loop(){
      var isWink=Math.random()<0.62;
      var which=isWink?['r']:['l','r'];
      one(which, isWink?160:90, function(){
        if(!isWink && Math.random()<0.28) setTimeout(function(){ one(['l','r'],70); },130);
      });
      setTimeout(loop, 2200+Math.random()*3400);
    }
    setTimeout(loop, 800+Math.random()*1300);
  }

  window.DMTElf={
    render:function(){
      var stages=document.querySelectorAll('[data-elf]');
      stages.forEach(function(stage,i){
        stage.innerHTML=svg(i);
        var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if(!reduce) blink(stage.querySelector('svg'));
      });
    }
  };
  document.addEventListener('DOMContentLoaded',function(){ window.DMTElf.render(); });
})();
