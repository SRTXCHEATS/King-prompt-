let slideInterval;

// १. पपअप खोल्ने र स्लाइडर सुरु गर्ने
function openPopup(card) {
    const popup = document.getElementById('popup');
    const popImg1 = document.getElementById('popImg1');
    const popImg2 = document.getElementById('popImg2');
    const labelDisplay = document.getElementById('labelDisplay');

    // कार्डबाट इमेज लिंक तानेर पपअपमा राख्ने
    popImg1.src = card.getAttribute('data-img1');
    popImg2.src = card.getAttribute('data-img2');
    
    // पपअप देखाउने
    popup.classList.remove('hidden');

    // ३ सेकेन्डको अटो-स्वाइप लोजिक
    slideInterval = setInterval(() => {
        if (popImg1.classList.contains('active')) {
            popImg1.classList.remove('active');
            popImg2.classList.add('active');
            labelDisplay.innerText = "AI Enhanced";
        } else {
            popImg2.classList.remove('active');
            popImg1.classList.add('active');
            labelDisplay.innerText = "Original";
        }
    }, 2000);

    // प्रम्प्ट लोड गर्नको लागि डेटा सुरक्षित गर्ने
    window.currentPrompt = card.getAttribute('data-prompt');
}

// २. प्रम्प्ट जेनेरेट गर्ने लोजिक
function startGeneration() {
    const genBtn = document.getElementById('genBtn');
    const loader = document.getElementById('loader');
    const typewriter = document.getElementById('typewriter');
    const copyBtn = document.getElementById('copyBtn');

    genBtn.classList.add('hidden');
    loader.classList.remove('hidden');
    typewriter.classList.add('hidden');
    typewriter.innerText = "";

    setTimeout(() => {
        loader.classList.add('hidden');
        typewriter.classList.remove('hidden');
        
        // टाइपराइटर इफेक्ट
        let i = 0;
        const text = window.currentPrompt;
        function type() {
            if (i < text.length) {
                typewriter.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                copyBtn.classList.remove('hidden');
            }
        }
        type();
    }, 8000);
}

// ३. पपअप बन्द गर्ने
function closePopup() {
    clearInterval(slideInterval); // स्लाइडर रोक्ने
    document.getElementById('popup').classList.add('hidden');
    document.getElementById('genBtn').classList.remove('hidden');
    document.getElementById('copyBtn').classList.add('hidden');
    document.getElementById('typewriter').classList.add('hidden');
}

// ४. कोड कपी गर्ने फङ्सन
function copyCode() {
    const text = document.getElementById('typewriter').innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Prompt Copied Successfully!"); // अलर्टको साटो यो कल गर्नुहोस्
    });
}

// यो फंक्शन तल थप्नुहोस्
function showToast(message) {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.className = "toast-message";
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 2000);
}
