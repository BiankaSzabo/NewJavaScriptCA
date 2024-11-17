document.addEventListener('DOMContentLoaded', () => {
  let $modal = document.getElementById("login-modal");
  let $btn = document.getElementById("btn-login");
  let $span = document.getElementsByClassName("close")[0];

  $btn.addEventListener('click', () => {
    $modal.style.display = "flex";
  })

  $span.addEventListener('click', () => {
    $modal.style.display = "none";
  })

});
