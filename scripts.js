const page = {
    sections: {
        login: document.getElementById('login'),
        intro: document.getElementById('intro'),
    },
    loginButton: document.getElementById('login_button'),
};

function activateSection(sectionName) {
    for (let [ name, section ] of Object.entries(page.sections)) {
        section.classList.add('hidden');
    }
    page.sections[sectionName].classList.remove('hidden');
}

page.loginButton.onclick = function() {
    activateSection('intro');
};
