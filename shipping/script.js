$(function () {
    $("#shippingDate").datepicker();
  
    $("#getShippingQuoteBtn").on("click", function (e) {
      e.preventDefault();
  
      const sender = $("#senderName").val().trim();
      const receiver = $("#receiverName").val().trim();
      const pickup = $("#pickup").val().trim();
      const delivery = $("#delivery").val().trim();
      const date = $("#shippingDate").val().trim();
      const goods = $("#goodsType").val().trim();
      const file = $("#uploadFile").prop("files")[0];
  
      if (!sender || !receiver || !pickup || !delivery || !date || !goods || !file) {
        showError("❗ Please fill all fields and upload a file.");
        return;
      }
  
      const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        showError("❗ Only JPG, PNG, or PDF files are allowed.");
        return;
      }
  
      const receiptHtml = `
        <p><strong>Sender:</strong> ${sender}</p>
        <p><strong>Receiver:</strong> ${receiver}</p>
        <p><strong>Pickup:</strong> ${pickup}</p>
        <p><strong>Delivery:</strong> ${delivery}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Goods:</strong> ${goods}</p>
        <p><strong>Uploaded File:</strong> ${file.name}</p>
      `;
  
      $("#shippingReceiptContent").html(receiptHtml);
      $("#shippingReceiptContainer").show();
    });
  
    $("#printShippingReceiptBtn").on("click", function () {
      const contents = document.getElementById("shippingReceiptContainer").innerHTML;
      const original = document.body.innerHTML;
      document.body.innerHTML = contents;
      window.print();
      document.body.innerHTML = original;
      location.reload();
    });
  
    function showError(message) {
        document.getElementById("errorMessage").innerText = message;
        document.getElementById("customErrorBox").classList.remove("hidden");
      }
      
      document.getElementById("closeErrorBox").addEventListener("click", function () {
        document.getElementById("customErrorBox").classList.add("hidden");
      });
  });
  