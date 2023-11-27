const checkForm = () => {
  const btn = document.querySelector(".btn");
  const email = document.querySelector(".email");
  const text = document.querySelector(".textArea");
  const checkBox = document.querySelector(".checkBox__input");

  const DISABLED_CLASS = "disabled";

  let fields = {
    email: email.classList.contains("email__valid"),
    text: text.classList.contains("textArea__valid"),
    checkBox: checkBox.checked,
  };

  if (Object.values(fields).includes(false)) {
    btn.classList.add(DISABLED_CLASS);
    return;
  }

  btn.classList.remove(DISABLED_CLASS);
};

export default checkForm;
