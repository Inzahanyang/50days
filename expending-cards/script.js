const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
    panel.addEventListener('click', (e) => {
        panels.forEach((panel) => panel.classList.remove('active'));

        panel.classList.add('active');
    });
});
