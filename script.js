// PC에서 대표번호 클릭 무효 / 모바일만 통화
(function(){
  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  const callBtn = document.getElementById('callBtn');
  if (callBtn && !isMobile){
    callBtn.addEventListener('click', (e)=>{ e.preventDefault(); });
    callBtn.style.cursor = 'default';
  }
})();

// FormSubmit AJAX
const form = document.getElementById('serviceForm');
const toast = document.getElementById('toast');

function showToast(msg){
  toast.textContent = msg;
  toast.hidden = false;
  setTimeout(()=> toast.hidden = true, 2600);
}

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data = new FormData(form);
  // FormSubmit에 필요한 hidden 필드
  data.append('_captcha', 'false');
  data.append('_subject', '[기가바이트] 온라인 접수');
  data.append('_template', 'table');

  try{
    const res = await fetch('https://formsubmit.co/ajax/noteservice@outlook.kr', {
      method:'POST',
      body: data
    });
    if(res.ok){
      form.reset();
      showToast('접수되었습니다. 전문 엔지니어가 빠르게 연락드리겠습니다.');
    }else{
      showToast('전송 실패. 잠시 후 다시 시도해주세요.');
    }
  }catch(err){
    showToast('네트워크 오류. 잠시 후 다시 시도해주세요.');
  }
});
