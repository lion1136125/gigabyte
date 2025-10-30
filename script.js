
(function(){
  const tel = document.getElementById('desktopTel');
  function isMobile(){ return /iphone|ipod|ipad|android|windows phone/i.test(navigator.userAgent); }
  if(tel && !isMobile()){ tel.addEventListener('click', e => e.preventDefault()); }
})();

const form = document.getElementById('serviceForm');
const toast = document.getElementById('toast');
const note = document.getElementById('formNote');

if(form){
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try{
      const res = await fetch(form.action, { method:'POST', body:data, headers:{'Accept':'application/json'} });
      if(res.ok){
        toast.hidden = false;
        form.reset();
        note.textContent = '접수되었습니다. 전문 엔지니어가 빠르게 연락드리겠습니다.';
        setTimeout(()=> toast.hidden = true, 5000);
      }else{
        alert('전송 실패: 잠시 후 다시 시도해 주세요.');
      }
    }catch(err){
      alert('네트워크 오류가 발생했습니다.');
    }
  });
}
