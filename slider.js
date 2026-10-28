// Точки под галереей экранов: на мобильной галерея прокручивается по горизонтали.
(function(){
  var gal=document.querySelector('.gallery'); if(!gal) return;
  var figs=[].slice.call(gal.querySelectorAll('figure')); if(figs.length<2) return;
  var dots=document.createElement('div'); dots.className='dots';
  figs.forEach(function(f,i){
    var b=document.createElement('button'); b.type='button';
    var cap=f.querySelector('figcaption b'); b.setAttribute('aria-label',cap?cap.textContent:String(i+1));
    b.addEventListener('click',function(){ f.scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'}); });
    dots.appendChild(b);
  });
  gal.parentNode.insertBefore(dots,gal.nextSibling);
  var btns=dots.children;
  function mark(i){ for(var k=0;k<btns.length;k++) btns[k].classList.toggle('on',k===i); }
  mark(0);
  if(!('IntersectionObserver' in window)) return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting) mark(figs.indexOf(e.target)); });
  },{root:gal,threshold:.6});
  figs.forEach(function(f){ io.observe(f); });
})();
