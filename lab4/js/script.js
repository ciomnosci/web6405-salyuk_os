// Класс из задания: конструктор + форматированный вывод в консоль.
class Complaint {
    constructor(name, email, crime, message, agreement) {
        this.name = name;
        this.email = email;
        this.crime = crime;
        this.message = message;
        this.agreement = agreement;
    }

    printInfo() {
        console.log(`Жалоба на Чепу:
Имя: ${this.name}
Email: ${this.email}
Проступок: ${this.crime}
Подробности: ${this.message || "не указаны"}
Согласие: ${this.agreement ? "да" : "нет"}`);
    }
}

const form = document.getElementById("complaint-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const complaint = new Complaint(
        document.getElementById("name").value.trim(),
        document.getElementById("email").value.trim(),
        document.getElementById("crime").value,
        document.getElementById("message").value.trim(),
        document.getElementById("agreement").checked
    );

    complaint.printInfo();

    const result = document.getElementById("form-result");
    const button = form.querySelector("button");
    result.textContent = "Отправка...";
    result.className = "form-result";
    button.disabled = true;

    try {
        const response = await fetch("/api/complaints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(complaint)
        });

        if (!response.ok) throw new Error("Сервер не принял запрос");
        result.textContent = "Жалоба отправлена! Чепа обязательно сделает вид, что ничего не было.";
        result.className = "form-result success";
        form.reset();
    } catch (error) {
        result.textContent = "Не удалось отправить. Откройте сайт через команду: node lab4/server.js";
        result.className = "form-result error";
        console.error(error);
    } finally {
        button.disabled = false;
    }
});
