document.addEventListener('DOMContentLoaded', function() {
    // State management
    let currentStep = 0;
    let userName = '';
    
    // DOM elements
    const conversationContainer = document.getElementById('conversationContainer');
    const giftContainer = document.getElementById('giftContainer');
    const cardContainer = document.getElementById('cardContainer');
    const currentMessage = document.getElementById('currentMessage');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const giftBox = document.getElementById('giftBox');
    const downloadBtn = document.getElementById('downloadBtn');
    const galleryBtn = document.getElementById('galleryBtn');
    const galleryModal = document.getElementById('galleryModal');
    const closeGallery = document.getElementById('closeGallery');
    const audioToggle = document.getElementById('audioToggle');
    const wishContainer = document.getElementById('wishContainer');
    const wishInput = document.getElementById('wishInput');
    const makeWishBtn = document.getElementById('makeWishBtn');
    const cakeContainer = document.getElementById('cakeContainer');
    const voiceContainer = document.getElementById('voiceContainer');
    const recordBtn = document.getElementById('recordBtn');
    const playBtn = document.getElementById('playBtn');
    const sendBtn = document.getElementById('sendBtn');
    const recordingStatus = document.getElementById('recordingStatus');
    const portalOverlay = document.getElementById('portalOverlay');
    const cursorTrail = document.getElementById('cursorTrail');
    const closeVoiceBtn = document.getElementById('closeVoiceBtn');
    const closeWishBtn = document.getElementById('closeWishBtn');
    const cardName = document.getElementById('cardName');
    
    // Audio management
    let backgroundMusic = null;
    let isAudioEnabled = false;
    let mediaRecorder = null;
    let recordedChunks = [];
    let isRecording = false;
    let recordedBlob = null;
    
    // Conversation flow
    const conversationFlow = [
        {
            message: "Hello, how are you doing?",
            placeholder: "Type your response here...",
            processInput: (input) => {
                return input.toLowerCase().trim();
            }
        },
        {
            message: "That's wonderful to hear! What's your name?",
            placeholder: "My name is...",
            processInput: (input) => {
                const nameMatch = input.match(/(?:my name is|i'm|i am|name is)\s+([a-zA-Z\s]+)/i);
                if (nameMatch) {
                    userName = nameMatch[1].trim();
                } else {
                    userName = input.trim();
                }
                return userName;
            }
        },
        {
            message: `Oh, I see it's your birthday today, ${userName}! Would you like to receive your gift from Joash?`,
            placeholder: "Yes, I'd love to!",
            processInput: (input) => {
                const response = input.toLowerCase().trim();
                return response.includes('yes') || response.includes('sure') || response.includes('love') || response.includes('please');
            }
        }
    ];
    
    // Initialize the conversation
    function initializeConversation() {
        currentStep = 0;
        updateMessage();
        userInput.focus();
    }
    
    // Update the current message
    function updateMessage() {
        if (currentStep < conversationFlow.length) {
            const step = conversationFlow[currentStep];
            currentMessage.textContent = step.message;
            userInput.placeholder = step.placeholder;
            userInput.value = '';
        }
    }
    
    // Process user input
    function processUserInput() {
        const input = userInput.value.trim();
        if (!input) return;
        
        const step = conversationFlow[currentStep];
        const result = step.processInput(input);
        
        if (currentStep === 0) {
            // First response - just move to next step
            currentStep++;
            setTimeout(() => {
                updateMessage();
                userInput.focus();
            }, 1000);
        } else if (currentStep === 1) {
            // Name input
            if (result && result.length > 0) {
                userName = result;
                currentStep++;
                setTimeout(() => {
                    updateMessage();
                    userInput.focus();
                }, 1000);
            } else {
                showTemporaryMessage("Please tell me your name!");
            }
        } else if (currentStep === 2) {
            // Gift offer
            if (result) {
                showGiftBox();
            } else {
                showTemporaryMessage("Are you sure? It's a special gift just for you!");
            }
        }
    }
    
    // Show temporary message
    function showTemporaryMessage(message) {
        const originalMessage = currentMessage.textContent;
        currentMessage.textContent = message;
        setTimeout(() => {
            currentMessage.textContent = originalMessage;
        }, 2000);
    }
    
    // Show gift box
    function showGiftBox() {
        conversationContainer.classList.add('fade-out');
        setTimeout(() => {
            conversationContainer.style.display = 'none';
            giftContainer.style.display = 'block';
            giftContainer.classList.add('fade-in');
        }, 500);
    }
    
    // Show birthday card
    function showBirthdayCard() {
        giftContainer.classList.add('fade-out');
        setTimeout(() => {
            giftContainer.style.display = 'none';
            cardContainer.style.display = 'block';
            cardContainer.classList.add('fade-in');
            
            // Update the card with the user's name
            if (userName && cardName) {
                cardName.textContent = userName;
            }
            
            // Show special features after card is revealed
            showSpecialFeatures();
        }, 500);
    }
    
    // Event listeners
    sendButton.addEventListener('click', processUserInput);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processUserInput();
        }
    });
    
    // Gift box click handler
    giftBox.addEventListener('click', function() {
        // Add opening animation
        giftBox.classList.add('opened');
        
        // Add sparkle burst effect
        createSparkleBurst();
        
        // Add confetti explosion
        createConfettiExplosion();
        
        // Show card after animation
        setTimeout(() => {
            showBirthdayCard();
        }, 1000);
    });
    
    // Download button handler
    downloadBtn.addEventListener('click', downloadCard);
    
    // Gallery button handler
    galleryBtn.addEventListener('click', showPhotoGallery);
    
    // Close gallery handler
    closeGallery.addEventListener('click', hidePhotoGallery);
    
    // Audio toggle handler
    audioToggle.addEventListener('click', toggleAudio);
    
    // Close gallery when clicking outside
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            hidePhotoGallery();
        }
    });
    
    // Wish making event listeners
    makeWishBtn.addEventListener('click', sendWishToStars);
    
    // Voice recording event listeners
    recordBtn.addEventListener('click', function() {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    });
    
    // Send voice message event listener
    sendBtn.addEventListener('click', sendVoiceMessageToJoash);
    
    // Close button event listeners
    closeVoiceBtn.addEventListener('click', closeVoiceContainer);
    closeWishBtn.addEventListener('click', closeWishContainer);
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all modals
            wishContainer.style.display = 'none';
            cakeContainer.style.display = 'none';
            voiceContainer.style.display = 'none';
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Close full-screen message modal
            closeMessageModal();
        }
    });
    
    // Create sparkle burst effect
    function createSparkleBurst() {
        const giftBoxRect = giftBox.getBoundingClientRect();
        const centerX = giftBoxRect.left + giftBoxRect.width / 2;
        const centerY = giftBoxRect.top + giftBoxRect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '8px';
            sparkle.style.height = '8px';
            sparkle.style.background = '#fff';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            
            document.body.appendChild(sparkle);
            
            // Animate sparkle
            const angle = (i / 12) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            sparkle.animate([
                {
                    transform: 'translate(0, 0) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                sparkle.remove();
            };
        }
    }
    
    // Create confetti explosion
    function createConfettiExplosion() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#ff6b9d'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
            
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti container after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
    
    // Create floating hearts
    function createFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'floating-hearts';
        document.body.appendChild(heartsContainer);
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 10000);
        }, 2000);
    }
    
    // Initialize background music
    function initBackgroundMusic() {
        // Create a simple audio context for background music
        // Note: In a real implementation, you would load an actual audio file
        backgroundMusic = {
            play: () => {
                if (isAudioEnabled) {
                    console.log('🎵 Playing background music...');
                }
            },
            pause: () => {
                console.log('🔇 Music paused');
            }
        };
    }
    
    // Toggle audio
    function toggleAudio() {
        isAudioEnabled = !isAudioEnabled;
        audioToggle.classList.toggle('muted', !isAudioEnabled);
        
        if (isAudioEnabled) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    }
    
    // Download card functionality
    function downloadCard() {
        // Create a proper SVG with correct encoding
        const displayName = userName || 'Ingrid';
        const svgContent = `<svg width="700" height="800" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffecd2;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#fcb69f;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="700" height="800" fill="url(#bg)" rx="20"/>
            <text x="350" y="200" text-anchor="middle" font-family="Dancing Script, cursive" font-size="60" fill="#8b4513">Happy Birthday</text>
            <text x="350" y="300" text-anchor="middle" font-family="Dancing Script, cursive" font-size="80" fill="#d2691e">${displayName}</text>
            <text x="350" y="450" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#5a4a3a">Wishing you a day filled with joy, laughter,</text>
            <text x="350" y="480" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#5a4a3a">and all the happiness you deserve!</text>
            <text x="350" y="520" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#5a4a3a">May this new year bring you countless</text>
            <text x="350" y="550" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#5a4a3a">blessings and wonderful memories.</text>
            <text x="350" y="620" text-anchor="middle" font-family="Poppins, sans-serif" font-size="22" fill="#8b4513">With love and warmest wishes,</text>
            <text x="350" y="660" text-anchor="middle" font-family="Dancing Script, cursive" font-size="36" fill="#d2691e">Joash</text>
        </svg>`;
        
        // Create blob and download
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = `birthday-card-${displayName.toLowerCase().replace(/\s+/g, '-')}.svg`;
        link.href = url;
        link.click();
        
        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }
    
    // Show photo gallery
    function showPhotoGallery() {
        galleryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Hide photo gallery
    function hidePhotoGallery() {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Magical cursor trail
    function createCursorTrail() {
        document.addEventListener('mousemove', function(e) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            
            cursorTrail.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        });
    }
    
    
    // Wish making feature
    function showWishMaker() {
        wishContainer.style.display = 'block';
    }
    
    function sendWishToStars() {
        const wish = wishInput.value.trim();
        if (!wish) return;
        
        // Create flying wish animation
        createFlyingWish(wish);
        
        // Hide wish container
        setTimeout(() => {
            wishContainer.style.display = 'none';
            wishInput.value = '';
        }, 2000);
    }
    
    function createFlyingWish(wish) {
        const wishElement = document.createElement('div');
        wishElement.textContent = wish;
        wishElement.style.position = 'fixed';
        wishElement.style.left = '50%';
        wishElement.style.top = '50%';
        wishElement.style.transform = 'translate(-50%, -50%)';
        wishElement.style.color = '#ff6b9d';
        wishElement.style.fontSize = '1.5rem';
        wishElement.style.fontWeight = 'bold';
        wishElement.style.zIndex = '10000';
        wishElement.style.pointerEvents = 'none';
        wishElement.style.textShadow = '0 0 10px rgba(255, 107, 157, 0.8)';
        
        document.body.appendChild(wishElement);
        
        // Animate wish flying to stars
        wishElement.animate([
            {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1
            },
            {
                transform: 'translate(-50%, -150vh) scale(0.5)',
                opacity: 0
            }
        ], {
            duration: 3000,
            easing: 'ease-out'
        }).onfinish = () => {
            wishElement.remove();
        };
    }
    
    // Interactive birthday cake
    function showBirthdayCake() {
        cakeContainer.style.display = 'block';
        
        // Add candle click handlers
        const candles = document.querySelectorAll('.candle');
        candles.forEach((candle, index) => {
            candle.addEventListener('click', function() {
                this.classList.toggle('lit');
                
                // Create sparkle effect when candle is lit
                if (this.classList.contains('lit')) {
                    createCandleSparkle(this);
                }
            });
        });
    }
    
    function createCandleSparkle(candle) {
        const rect = candle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top;
        
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#fff';
            sparkle.style.borderRadius = '50%';
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            
            document.body.appendChild(sparkle);
            
            const angle = (i / 5) * Math.PI * 2;
            const distance = 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            sparkle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                sparkle.remove();
            };
        }
    }
    
    // Voice message recording
    function showVoiceRecorder() {
        voiceContainer.style.display = 'block';
    }
    
    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            recordedChunks = [];
            
            mediaRecorder.ondataavailable = function(event) {
                recordedChunks.push(event.data);
            };
            
            mediaRecorder.onstop = function() {
                recordedBlob = new Blob(recordedChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(recordedBlob);
                
                // Enable play and send buttons
                playBtn.disabled = false;
                sendBtn.disabled = false;
                
                playBtn.onclick = () => {
                    const audio = new Audio(audioUrl);
                    audio.play();
                };
                
                recordingStatus.textContent = 'Recording saved! Click play to hear your message or send to Joash.';
            };
            
            mediaRecorder.start();
            isRecording = true;
            recordBtn.classList.add('recording');
            recordBtn.textContent = 'Stop Recording';
            recordingStatus.textContent = 'Recording... Speak now!';
            
        } catch (error) {
            recordingStatus.textContent = 'Microphone access denied. Please allow microphone access.';
        }
    }
    
    function stopRecording() {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            isRecording = false;
            recordBtn.classList.remove('recording');
            recordBtn.textContent = 'Start Recording';
        }
    }
    
    // Send voice message to Joash via email
    async function sendVoiceMessageToJoash() {
        if (!recordedBlob) {
            recordingStatus.textContent = 'No recording available. Please record a message first.';
            return;
        }
        
        // Show sending animation
        sendBtn.classList.add('sending');
        sendBtn.disabled = true;
        recordingStatus.textContent = 'Sending message to Joash...';
        
        try {
            // Convert blob to base64 for email attachment
            const base64Audio = await blobToBase64(recordedBlob);
            
            // Create email content
            const emailData = {
                to: 'jmonda2020@gmail.com',
                subject: `Birthday Voice Message for Ingrid in Indiana from ${userName || 'Anonymous'}`,
                body: `
                    <h2>🎉 Birthday Voice Message for Ingrid 🎉</h2>
                    <p>Dear Joash,</p>
                    <p>Someone has recorded a special birthday voice message for Ingrid who is in Indiana!</p>
                    <p><strong>From:</strong> ${userName || 'Anonymous'}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
                    <p><strong>Location:</strong> Indiana, USA</p>
                    <p>The voice message is attached to this email. Please play it for Ingrid on her special day!</p>
                    <p>Wishing Ingrid a wonderful birthday from Indiana! 🎂✨</p>
                    <hr>
                    <p><em>This message was sent from the Interactive Birthday Experience website.</em></p>
                `,
                attachment: {
                    filename: `birthday-message-ingrid-indiana-${userName || 'anonymous'}-${Date.now()}.wav`,
                    content: base64Audio,
                    type: 'audio/wav'
                }
            };
            
            // Send email using EmailJS (you'll need to set this up)
            await sendEmailWithAttachment(emailData);
            
            // Success message
            recordingStatus.textContent = '✅ Message sent successfully to Joash! He will receive your voice message.';
            sendBtn.textContent = 'Message Sent!';
            
            // Create success animation
            createSuccessAnimation();
            
        } catch (error) {
            console.error('Error sending email:', error);
            recordingStatus.textContent = '❌ Failed to send message. Please try again or contact Joash directly.';
            sendBtn.classList.remove('sending');
            sendBtn.disabled = false;
        }
    }
    
    // Convert blob to base64
    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    
    // Send email with attachment using EmailJS
    async function sendEmailWithAttachment(emailData) {
        // Initialize EmailJS (you'll need to get your own service ID, template ID, and public key)
        // For now, we'll use a demo setup
        const serviceId = 'service_demo'; // Replace with your EmailJS service ID
        const templateId = 'template_demo'; // Replace with your EmailJS template ID
        const publicKey = 'demo_key'; // Replace with your EmailJS public key
        
        try {
            // Initialize EmailJS
            emailjs.init(publicKey);
            
            // Prepare template parameters
            const templateParams = {
                to_email: emailData.to,
                subject: emailData.subject,
                message: emailData.body,
                from_name: userName || 'Anonymous',
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                location: 'Indiana, USA',
                recipient_name: 'Ingrid',
                // Note: EmailJS doesn't support file attachments directly
                // The audio file would need to be uploaded to a cloud service first
                audio_note: 'Voice message recorded for Ingrid in Indiana - please check the birthday experience website'
            };
            
            // Send email
            const response = await emailjs.send(serviceId, templateId, templateParams);
            console.log('Email sent successfully:', response);
            return response;
            
        } catch (error) {
            console.error('EmailJS error:', error);
            // Fallback: Create a mailto link for manual sending
            createMailtoFallback(emailData);
            throw error;
        }
    }
    
    // Fallback method: Create Gmail compose link
    function createMailtoFallback(emailData) {
        const subject = encodeURIComponent(emailData.subject);
        const body = encodeURIComponent(`
Dear Joash,

🎉 Birthday Voice Message for Ingrid 🎉

Someone has recorded a special birthday voice message for Ingrid who is in Indiana!

From: ${userName || 'Anonymous'}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
Location: Indiana, USA

The voice message was recorded on the Interactive Birthday Experience website.
Please download and play the attached voice file for Ingrid on her special day!

Wishing Ingrid a wonderful birthday from Indiana! 🎂✨

---
This message was sent from the Interactive Birthday Experience website.
        `);
        
        // Create Gmail compose link (like the one shown in the console)
        const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailData.to}&su=${subject}&body=${body}`;
        
        // Open Gmail compose
        window.open(gmailComposeLink, '_blank');
        
        // Show instruction to user
        recordingStatus.innerHTML = `
            <div style="text-align: center;">
                <p>📧 Gmail compose opened!</p>
                <p>Please download the voice file and attach it to the email for Joash.</p>
                <p><strong>Recipient:</strong> jmonda2020@gmail.com</p>
                <p><strong>For:</strong> Ingrid in Indiana</p>
                <button onclick="downloadVoiceMessage()" style="
                    background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    margin-top: 10px;
                ">Download Voice File</button>
            </div>
        `;
    }
    
    // Download voice message as file
    function downloadVoiceMessage() {
        if (recordedBlob) {
            const url = URL.createObjectURL(recordedBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `birthday-message-${userName || 'anonymous'}-${Date.now()}.wav`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
    
    // Make downloadVoiceMessage globally available
    window.downloadVoiceMessage = downloadVoiceMessage;
    
    // Close container functions
    function closeVoiceContainer() {
        voiceContainer.style.display = 'none';
    }
    
    function closeWishContainer() {
        wishContainer.style.display = 'none';
    }
    
    // Show detailed photo messages
    function showPhotoMessage(category) {
        const messages = {
            'birthday-photos': {
                title: '📷 Birthday Photos',
                message: `Dear Ingrid,

These photos capture the beautiful moments of your special day in Indiana! Every smile, every laugh, every precious memory is frozen in time.

From the first light of your birthday morning to the last dance of the evening, these images tell the story of a day filled with love, joy, and celebration.

May these photos remind you of how much you are loved and cherished by everyone around you. You bring so much light and happiness into the world!

With love and warmest birthday wishes,
Joash and all your loved ones ❤️`
            },
            'birthday-cake': {
                title: '🎂 Birthday Cake',
                message: `Sweet Ingrid,

This delicious celebration cake was made with love just for you! Each layer represents another year of your beautiful life, and every candle holds a wish for your happiness.

As you blow out those candles, know that each flame carries the hopes and dreams of everyone who loves you. Make your wish, beautiful Ingrid, and watch it come true!

The sweetness of this cake is nothing compared to the sweetness you bring to our lives every day.

Happy Birthday, sweetheart! 🎂✨`
            },
            'celebration': {
                title: '🎉 Celebration',
                message: `Dear Ingrid,

What a wonderful celebration! Dancing, laughing, and celebrating another year of your amazing life - you bring so much joy to everyone around you.

Your laughter is contagious, your smile lights up the room, and your presence makes every gathering brighter. This celebration is a testament to the beautiful person you are and the love you inspire in others.

May this year bring you even more reasons to dance, laugh, and celebrate!

With joy and celebration,
Your loving friends and family 🎉💃`
            },
            'gifts': {
                title: '💝 Gifts',
                message: `Beloved Ingrid,

These thoughtful presents are tokens of the love and appreciation you deserve. Each gift was chosen with care, knowing that you deserve the very best.

But the greatest gift of all is you - your kindness, your grace, your beautiful spirit. These presents are just small ways to show you how much you mean to us.

May these gifts bring you joy and remind you of how special you are to everyone who knows you.

With love and appreciation,
Your grateful friends and family 💝❤️`
            },
            'friends-family': {
                title: '👥 Friends & Family',
                message: `Dearest Ingrid,

Look at all the people who love you most, gathered together to celebrate you! Your presence makes every gathering brighter, and your love brings us all closer together.

These are the people whose lives you've touched, whose hearts you've warmed, and whose days you've made brighter. We are all here because of the beautiful person you are.

Your family and friends are your greatest treasure, and you are ours. Thank you for being such an amazing person who brings us all together.

With all our love,
Your family and friends 👥❤️`
            },
            'special-moments': {
                title: '🌟 Special Moments',
                message: `Precious Ingrid,

These are the magical, unforgettable moments that make your birthday truly special - memories that will last a lifetime!

From the surprise in your eyes when you saw your cake, to the warmth of hugs from loved ones, to the joy of making wishes and blowing out candles - these moments are pure magic.

These special moments remind us why we celebrate you. You make ordinary days extraordinary and special days absolutely magical.

May you have many more special moments in the year ahead!

With love and magical wishes,
Your family and friends 🌟✨`
            }
        };
        
        const selectedMessage = messages[category];
        if (selectedMessage) {
            // Create a beautiful modal for the detailed message
            const messageModal = document.createElement('div');
            messageModal.className = 'message-modal';
            messageModal.innerHTML = `
                <div class="message-content">
                    <div class="message-header">
                        <h3>${selectedMessage.title}</h3>
                        <button class="close-message-btn" onclick="closeMessageModal()">×</button>
                    </div>
                    <div class="message-body">
                        <p>${selectedMessage.message}</p>
                    </div>
                </div>
            `;
            
            // Add modal styles
            messageModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                backdrop-filter: blur(10px);
            `;
            
            document.body.appendChild(messageModal);
            
            // Add animation
            messageModal.style.opacity = '0';
            messageModal.animate([
                { opacity: 0, transform: 'scale(0.8)' },
                { opacity: 1, transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'ease-out'
            });
        }
    }
    
    // Close message modal
    function closeMessageModal() {
        const modal = document.querySelector('.message-modal');
        if (modal) {
            modal.animate([
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0.8)' }
            ], {
                duration: 200,
                easing: 'ease-in'
            }).onfinish = () => {
                modal.remove();
            };
        }
    }
    
    // Make functions globally available
    window.showPhotoMessage = showPhotoMessage;
    window.closeMessageModal = closeMessageModal;
    
    // Create success animation
    function createSuccessAnimation() {
        // Create floating checkmarks
        for (let i = 0; i < 5; i++) {
            const checkmark = document.createElement('div');
            checkmark.innerHTML = '✅';
            checkmark.style.position = 'fixed';
            checkmark.style.left = Math.random() * window.innerWidth + 'px';
            checkmark.style.top = '100%';
            checkmark.style.fontSize = '2rem';
            checkmark.style.pointerEvents = 'none';
            checkmark.style.zIndex = '10000';
            
            document.body.appendChild(checkmark);
            
            checkmark.animate([
                {
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: 'translateY(-100vh) rotate(360deg)',
                    opacity: 0
                }
            ], {
                duration: 3000,
                easing: 'ease-out'
            }).onfinish = () => {
                checkmark.remove();
            };
        }
    }
    
    // Magical portal transitions
    function showPortalTransition() {
        portalOverlay.style.display = 'flex';
        
        // Create portal particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'portal-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            document.querySelector('.portal-particles').appendChild(particle);
        }
        
        // Hide portal after animation
        setTimeout(() => {
            portalOverlay.style.display = 'none';
        }, 3000);
    }
    
    // Show special features after card is revealed
    function showSpecialFeatures() {
        setTimeout(() => {
            showWishMaker();
        }, 2000);
        
        setTimeout(() => {
            showBirthdayCake();
        }, 4000);
        
        setTimeout(() => {
            showVoiceRecorder();
        }, 6000);
    }
    
    // Add floating particles animation
    function createFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        
        setInterval(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.background = 'rgba(255, 255, 255, 0.6)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.pointerEvents = 'none';
            
            particlesContainer.appendChild(particle);
            
            // Animate particle
            particle.animate([
                {
                    transform: 'translateY(0)',
                    opacity: 0
                },
                {
                    transform: 'translateY(-100vh)',
                    opacity: 1
                }
            ], {
                duration: 8000 + Math.random() * 4000,
                easing: 'linear'
            }).onfinish = () => {
                particle.remove();
            };
        }, 2000);
    }
    
    // Add card hover effects
    function addCardEffects() {
        const cardWrapper = document.querySelector('.card-wrapper');
        
        if (cardWrapper) {
            cardWrapper.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            cardWrapper.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Add click effect
            cardWrapper.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    }
    
    // Add keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Reset to beginning
            location.reload();
        }
    });
    
    // Add touch support for mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const touchDiff = touchStartY - touchEndY;
        
        // Swipe up to continue
        if (touchDiff > 50 && currentStep < conversationFlow.length) {
            processUserInput();
        }
    });
    
    // Initialize everything
    function init() {
        initializeConversation();
        createFloatingParticles();
        createFloatingHearts();
        createCursorTrail();
        addCardEffects();
        initBackgroundMusic();
        
        // Add some initial sparkle effects
        setTimeout(() => {
            createSparkleBurst();
        }, 2000);
    }
    
    // Start the experience
    init();
    
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});