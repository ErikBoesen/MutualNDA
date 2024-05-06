const page = {
    sections: {
        login: document.getElementById('login'),
        intro: document.getElementById('intro'),
        questionnaire: document.getElementById('questionnaire'),
    },
    loginButton: document.getElementById('login_button'),
    questionnaireButton: document.getElementById('questionnaire_button')
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

page.questionnaireButton.onclick = function() {
    activateSection('questionnaire')
}

function toggleOtherInput() {
    const otherInput = document.getElementById('otherSecretInput');
    const otherCheckbox = document.getElementById('otherSecretInfoType');
    if (otherCheckbox.checked) {
        otherInput.classList.remove('hidden');
    } else {
        otherInput.classList.add('hidden');
    }
}

// Function to handle changes in information type checkboxes
document.querySelectorAll('input[name="informationType"]').forEach(item => {
    item.addEventListener('change', function() {
        const sectionId = item.id + "Section";
        const detailsSection = document.getElementById(sectionId);
        if (item.checked) {
            detailsSection.classList.remove('hidden');
        } else {
            detailsSection.classList.add('hidden');
        }
    });
});

// Ensure 'Other' text is updated and displayed immediately when typed
document.getElementById('otherSecretInput').addEventListener('input', function() {
    document.getElementById('otherDetails').textContent = this.value;
});

// Function to handle changes in duration options radio buttons
document.querySelectorAll('input[name="durationOptions"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // Hide all duration sections first
        document.querySelectorAll('.durationSection').forEach(section => {
            section.classList.add('hidden');
        });

        // Show only the relevant duration section
        const selectedSection = document.getElementById(this.value + 'Section');
        if (selectedSection) {
            selectedSection.classList.remove('hidden');
        }

        // Special handling for specific time period input visibility
        const timeInput = document.getElementById('timePeriod');
        if (this.value === 'specificTime') {
            timeInput.classList.remove('hidden');
        } else {
            timeInput.classList.add('hidden');
        }
    });
});

// Handling input for specifying a time period
document.getElementById('timePeriod').addEventListener('input', function() {
    let timePeriod = document.getElementById('dynamicTimePeriod');
    if (this.value.trim() === '') {
        timePeriod.textContent = '[specify period]';
    } else {
        timePeriod.textContent = this.value;
    }
});

// Function to handle changes in sharing situations checkboxes
document.querySelectorAll('input[name="shareSituations"]').forEach(item => {
    item.addEventListener('change', function() {
        const sectionId = item.id + "Section"; // Construct the ID of the section to toggle
        const detailsSection = document.getElementById(sectionId);
        if (item.checked) {
            detailsSection.classList.remove('hidden'); // Show section if checkbox is checked
        } else {
            detailsSection.classList.add('hidden'); // Hide section if checkbox is unchecked
        }
    });
});

// Handling input for fair response
document.getElementById('fairResponseInput').addEventListener('input', function() {
    let responseDisplay = document.getElementById('fairResponseDisplay');
    responseDisplay.textContent = this.value;
    // Optionally, control the visibility of the response section
    document.getElementById('fairResponseSection').classList.remove('hidden');
});