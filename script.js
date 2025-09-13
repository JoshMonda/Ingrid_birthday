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
    const canvaCard = document.getElementById('canvaCard');
    
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
            
            // Add personalized name overlay on the Canva card
            if (userName) {
                addPersonalizedNameOverlay(userName);
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
        // Create a personalized birthday card SVG
        const displayName = userName || 'Ingrid';
        const svgContent = `<svg width="700" height="800" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffecd2;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#fcb69f;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="nameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#d2691e;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#ff8c00;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="700" height="800" fill="url(#bg)" rx="20"/>
            
            <!-- Decorative elements -->
            <circle cx="100" cy="100" r="30" fill="#ff6b6b" opacity="0.3"/>
            <circle cx="600" cy="150" r="25" fill="#4ecdc4" opacity="0.3"/>
            <circle cx="150" cy="700" r="35" fill="#f9ca24" opacity="0.3"/>
            <circle cx="550" cy="650" r="28" fill="#6c5ce7" opacity="0.3"/>
            
            <!-- Balloons -->
            <ellipse cx="120" cy="200" rx="15" ry="25" fill="#ff6b6b"/>
            <ellipse cx="580" cy="180" rx="12" ry="20" fill="#4ecdc4"/>
            <ellipse cx="350" cy="120" rx="18" ry="30" fill="#f9ca24"/>
            
            <!-- Main content -->
            <text x="350" y="200" text-anchor="middle" font-family="Dancing Script, cursive" font-size="60" fill="#8b4513" font-weight="700">Happy Birthday</text>
            <text x="350" y="300" text-anchor="middle" font-family="Dancing Script, cursive" font-size="80" fill="url(#nameGradient)" font-weight="600">${displayName}</text>
            
            <!-- Birthday message -->
            <text x="350" y="450" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#5a4a3a">Wishing you a day filled with joy, laughter,</text>
            <text x="350" y="480" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#5a4a3a">and all the happiness you deserve!</text>
            <text x="350" y="520" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#5a4a3a">May this new year bring you countless</text>
            <text x="350" y="550" text-anchor="middle" font-family="Poppins, sans-serif" font-size="20" fill="#5a4a3a">blessings and wonderful memories.</text>
            
            <!-- Signature -->
            <text x="350" y="650" text-anchor="middle" font-family="Poppins, sans-serif" font-size="22" fill="#8b4513" font-style="italic">With love and warmest wishes,</text>
            <text x="350" y="690" text-anchor="middle" font-family="Dancing Script, cursive" font-size="36" fill="#d2691e" font-weight="600">Joash</text>
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
        console.log('Showing birthday cake...');
        cakeContainer.style.display = 'block';
        
        // Wait for the cake to be visible, then add candle click handlers
        setTimeout(() => {
            addCandleClickHandlers();
        }, 200);
    }
    
    // Add candle click handlers
    function addCandleClickHandlers() {
        console.log('Adding candle click handlers...');
        const candles = document.querySelectorAll('.candle');
        console.log('Found candles:', candles.length);
        
        if (candles.length === 0) {
            console.error('No candles found!');
            return;
        }
        
        candles.forEach((candle, index) => {
            console.log(`Setting up candle ${index + 1}:`, candle);
            
            // Remove any existing event listeners to prevent duplicates
            candle.removeEventListener('click', handleCandleClick);
            candle.removeEventListener('touchstart', handleCandleClick);
            
            // Add both click and touch handlers for better mobile support
            candle.addEventListener('click', handleCandleClick);
            candle.addEventListener('touchstart', handleCandleClick);
            
            // Make sure the candle is clickable
            candle.style.cursor = 'pointer';
            candle.style.pointerEvents = 'auto';
            candle.style.userSelect = 'none';
            
            // Add a visual indicator that it's clickable
            candle.title = 'Click to light up!';
            
            console.log(`Candle ${index + 1} setup complete`);
        });
        
        console.log('All candle handlers added successfully');
    }
    
    // Handle candle click
    function handleCandleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const candle = event.currentTarget;
        console.log('Candle clicked!', candle);
        
        // Toggle the lit state
        const wasLit = candle.classList.contains('lit');
        candle.classList.toggle('lit');
        const isNowLit = candle.classList.contains('lit');
        
        console.log(`Candle was ${wasLit ? 'lit' : 'unlit'}, now ${isNowLit ? 'lit' : 'unlit'}`);
        
        // Create sparkle effect when candle is lit
        if (isNowLit) {
            createCandleSparkle(candle);
        }
        
        // Add a click animation
        candle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            candle.style.transform = 'scale(1)';
        }, 150);
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
            console.log('Starting recording...');
            recordingStatus.textContent = 'Requesting microphone access...';
            
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                } 
            });
            
            console.log('Microphone access granted');
            mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });
            recordedChunks = [];
            
            mediaRecorder.ondataavailable = function(event) {
                console.log('Data available:', event.data.size, 'bytes');
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };
            
            mediaRecorder.onstop = function() {
                console.log('Recording stopped, chunks:', recordedChunks.length);
                if (recordedChunks.length > 0) {
                    recordedBlob = new Blob(recordedChunks, { type: 'audio/webm' });
                    console.log('Recording blob created:', recordedBlob.size, 'bytes');
                    
                    // Enable play and send buttons
                    playBtn.disabled = false;
                    sendBtn.disabled = false;
                    
                    // Create audio URL for playback
                    const audioUrl = URL.createObjectURL(recordedBlob);
                    
                    playBtn.onclick = () => {
                        const audio = new Audio(audioUrl);
                        audio.play().catch(e => console.error('Playback error:', e));
                    };
                    
                    recordingStatus.textContent = 'Recording saved! Click play to hear your message or send to Joash.';
                } else {
                    recordingStatus.textContent = 'No audio recorded. Please try again.';
                }
                
                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            };
            
            mediaRecorder.onerror = function(event) {
                console.error('MediaRecorder error:', event.error);
                recordingStatus.textContent = 'Recording error occurred. Please try again.';
            };
            
            mediaRecorder.start(1000); // Collect data every second
            isRecording = true;
            recordBtn.classList.add('recording');
            recordBtn.innerHTML = '<span class="voice-icon">⏹️</span>Stop Recording';
            recordingStatus.textContent = 'Recording... Speak now!';
            
            console.log('Recording started successfully');
            
        } catch (error) {
            console.error('Recording error:', error);
            recordingStatus.textContent = 'Microphone access denied. Please allow microphone access and try again.';
        }
    }
    
    function stopRecording() {
        if (mediaRecorder && isRecording) {
            console.log('Stopping recording...');
            mediaRecorder.stop();
            isRecording = false;
            recordBtn.classList.remove('recording');
            recordBtn.innerHTML = '<span class="voice-icon">🎤</span>Start Recording';
            recordingStatus.textContent = 'Processing recording...';
        }
    }
    
    // Send voice message to Joash via email
    async function sendVoiceMessageToJoash() {
        if (!recordedBlob) {
            recordingStatus.textContent = 'No recording available. Please record a message first.';
            return;
        }
        
        console.log('Sending voice message to Joash...');
        
        // Show sending animation
        sendBtn.classList.add('sending');
        sendBtn.disabled = true;
        recordingStatus.textContent = 'Preparing message for Joash...';
        
        try {
            // Create a simple email solution using mailto with download
            const displayName = userName || 'Anonymous';
            const timestamp = new Date().toLocaleString();
            
            // Create download link for the audio file
            const audioUrl = URL.createObjectURL(recordedBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = audioUrl;
            downloadLink.download = `birthday-message-${displayName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.webm`;
            
            // Create email content
            const subject = encodeURIComponent(`🎉 Birthday Voice Message for Ingrid from ${displayName}`);
            const body = encodeURIComponent(`
Dear Joash,

🎉 Birthday Voice Message for Ingrid 🎉

Someone has recorded a special birthday voice message for Ingrid!

From: ${displayName}
Date: ${timestamp}
Location: Indiana, USA

The voice message is attached to this email. Please download and play it for Ingrid on her special day!

Wishing Ingrid a wonderful birthday! 🎂✨

---
This message was sent from the Interactive Birthday Experience website.
            `);
            
            // Create Gmail compose link
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=jmonda2020@gmail.com&su=${subject}&body=${body}`;
            
            // Show instructions to user
            recordingStatus.innerHTML = `
                <div style="text-align: center; padding: 10px;">
                    <p>📧 Ready to send to Joash!</p>
                    <p><strong>Recipient:</strong> jmonda2020@gmail.com</p>
                    <p><strong>For:</strong> Ingrid's Birthday</p>
                    <div style="margin: 15px 0;">
                        <button onclick="downloadVoiceMessage()" style="
                            background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 20px;
                            cursor: pointer;
                            margin: 5px;
                            font-size: 14px;
                        ">📥 Download Voice File</button>
                        <button onclick="openGmailCompose()" style="
                            background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 20px;
                            cursor: pointer;
                            margin: 5px;
                            font-size: 14px;
                        ">📧 Open Gmail</button>
                    </div>
                    <p style="font-size: 12px; color: #666;">
                        1. Download the voice file<br>
                        2. Open Gmail compose<br>
                        3. Attach the downloaded file<br>
                        4. Send to Joash!
                    </p>
                </div>
            `;
            
            // Store the download link globally
            window.voiceDownloadLink = downloadLink;
            window.gmailComposeLink = gmailLink;
            
            sendBtn.textContent = 'Instructions Ready!';
            
            // Create success animation
            createSuccessAnimation();
            
        } catch (error) {
            console.error('Error preparing message:', error);
            recordingStatus.textContent = '❌ Error preparing message. Please try again.';
            sendBtn.classList.remove('sending');
            sendBtn.disabled = false;
        }
    }
    
    
    // Download voice message as file
    function downloadVoiceMessage() {
        if (window.voiceDownloadLink) {
            window.voiceDownloadLink.click();
        } else if (recordedBlob) {
            const url = URL.createObjectURL(recordedBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `birthday-message-${userName || 'anonymous'}-${Date.now()}.webm`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
    
    // Open Gmail compose
    function openGmailCompose() {
        if (window.gmailComposeLink) {
            window.open(window.gmailComposeLink, '_blank');
        }
    }
    
    // Make functions globally available
    window.downloadVoiceMessage = downloadVoiceMessage;
    window.openGmailCompose = openGmailCompose;
    
    // Close container functions
    function closeVoiceContainer() {
        voiceContainer.style.display = 'none';
    }
    
    function closeWishContainer() {
        wishContainer.style.display = 'none';
    }
    
    // Add personalized name overlay on Canva card
    function addPersonalizedNameOverlay(name) {
        // Remove any existing name overlay
        const existingOverlay = document.getElementById('nameOverlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Create name overlay
        const nameOverlay = document.createElement('div');
        nameOverlay.id = 'nameOverlay';
        nameOverlay.innerHTML = `
            <div class="name-overlay-content">
                <h2 class="personalized-name">${name}</h2>
            </div>
        `;
        
        // Style the overlay
        nameOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Style the content
        const content = nameOverlay.querySelector('.name-overlay-content');
        content.style.cssText = `
            text-align: center;
            background: rgba(255, 255, 255, 0.9);
            padding: 20px 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            animation: nameSlideIn 1s ease-out;
        `;
        
        // Style the name
        const nameElement = nameOverlay.querySelector('.personalized-name');
        nameElement.style.cssText = `
            font-family: 'Dancing Script', cursive;
            font-size: 3rem;
            color: #d2691e;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            font-weight: 600;
            animation: nameGlow 2s ease-in-out infinite alternate;
        `;
        
        // Add to card wrapper
        const cardWrapper = document.querySelector('.card-wrapper');
        if (cardWrapper) {
            cardWrapper.appendChild(nameOverlay);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                if (nameOverlay && nameOverlay.parentNode) {
                    nameOverlay.style.animation = 'nameSlideOut 1s ease-in forwards';
                    setTimeout(() => {
                        if (nameOverlay && nameOverlay.parentNode) {
                            nameOverlay.remove();
                        }
                    }, 1000);
                }
            }, 5000);
        }
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
    window.testCandles = function() {
        console.log('Testing candles...');
        const candles = document.querySelectorAll('.candle');
        console.log('Found candles:', candles.length);
        candles.forEach((candle, index) => {
            console.log(`Candle ${index + 1}:`, candle);
            console.log('  - Visible:', candle.offsetWidth > 0 && candle.offsetHeight > 0);
            console.log('  - Clickable:', candle.style.pointerEvents !== 'none');
            console.log('  - Has click handler:', candle.onclick !== null);
        });
    };
    
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
        
        // Initialize cake candles if cake is visible
        setTimeout(() => {
            if (cakeContainer.style.display !== 'none') {
                addCandleClickHandlers();
            }
        }, 1000);
        
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