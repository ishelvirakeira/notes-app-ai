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
