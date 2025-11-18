document.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", e => {//e is for event
    const noteId = e.target.dataset.id;
    fetch("/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId })
    }).then(res => {
      if (res.ok) window.location.reload();
    });
  });
});
//AI Rewrite Feature
document.addEventListener("DOMContentLoaded", ()=>{
  const rewriteBtn = document.getElementById("rewriteBtn");
  if(rewriteBtn){
    rewriteBtn.addEventListener("click", async()=>{
      const contentBox = document.querySelector("textarea[name='content']");
      const outputBox = document.getElementById("output");
      const tone = document.querySelector('#tone').value;

      outputBox.innerText = "Rewriting note with AI...";

      const response = await fetch("/ai/rewrite", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          text: contentBox.value,
          tone:tone
        })
      });

      const data = await response.json();

      if(data.error){
        outputBox.innerText="Error: " + data.error;
      } else{
        outputBox.innerText = data.rewritten;
      }
    });

  }

});

//summary feature
document.addEventListener("DOMContentLoaded", ()=>{
  const summarizeBtn = document.getElementById("summarizeBtn");
  if(summarizeBtn){
    summarizeBtn.addEventListener("click", async()=>{
      const summaryBox=document.getElementById("summaryOutput");
      const contentBox = document.querySelector("textarea[name='content']");

      summaryBox.innerText="Summarizing your note...";

      const response = await fetch("/ai/summary",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          text: contentBox.value
    })
  });

  const data = await response.json();
  if(data.error){
    summaryBox.innerText="Error: " + data.error;
  } else {
    summaryBox.innerText = data.summary;
  }
  });
}
});
