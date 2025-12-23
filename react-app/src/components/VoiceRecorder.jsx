import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function VoiceRecorder({ userName, onClose }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const [recordingStatus, setRecordingStatus] = useState('')
  const [audioUrl, setAudioUrl] = useState(null)
  const mediaRecorderRef = useRef(null)
  const recordedChunksRef = useRef([])

  const startRecording = async () => {
    try {
      setRecordingStatus('Requesting microphone access...')
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      })

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      mediaRecorderRef.current = mediaRecorder
      recordedChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        if (recordedChunksRef.current.length > 0) {
          const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' })
          setRecordedBlob(blob)
          const url = URL.createObjectURL(blob)
          setAudioUrl(url)
          setRecordingStatus('Recording saved! Click play to hear your message or send to Joash.')
        } else {
          setRecordingStatus('No audio recorded. Please try again.')
        }
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error)
        setRecordingStatus('Recording error occurred. Please try again.')
      }

      mediaRecorder.start(1000)
      setIsRecording(true)
      setRecordingStatus('Recording... Speak now!')
    } catch (error) {
      console.error('Recording error:', error)
      setRecordingStatus('Microphone access denied. Please allow microphone access and try again.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setRecordingStatus('Processing recording...')
    }
  }

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play().catch(e => console.error('Playback error:', e))
    }
  }

  const handleSend = async () => {
    if (!recordedBlob) {
      setRecordingStatus('No recording available. Please record a message first.')
      return
    }

    const displayName = userName || 'Anonymous'
    const timestamp = new Date().toLocaleString()
    const teamEmail = 'jmonda2020@gmail.com'
    
    setRecordingStatus('Preparing email with voice attachment...')
    
    try {
      // Convert blob to File for attachment
      const fileName = `christmas-message-${displayName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.webm`
      const audioFile = new File([recordedBlob], fileName, { type: 'audio/webm' })
      
      // Create email content
      const emailBody = `
Dear Global South Incubator Team,

🎄 Christmas Voice Message 🎄

A team member has recorded a special Christmas voice message for the team!

From: ${displayName}
Date: ${timestamp}
Company: Global South Incubator

The voice message is attached to this email. Please download and play it to share with the team!

Wishing everyone a Merry Christmas and a Happy New Year! 🎄✨

---
This platform was created by Joash as a gift to celebrate our team.
This message was sent from the Global South Incubator Christmas Celebration platform.
      `.trim()

      // Try to use EmailJS if configured, otherwise use mailto with download
      const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
        // Initialize EmailJS
        emailjs.init(emailjsPublicKey)

        // Create a form element for EmailJS sendForm (required for attachments)
        const form = document.createElement('form')
        form.style.display = 'none'
        
        // Create template parameters
        const templateParams = {
          to_email: teamEmail,
          from_name: displayName,
          subject: `🎄 Christmas Voice Message from ${displayName} - Global South Incubator`,
          message: emailBody,
          date: timestamp,
          company: 'Global South Incubator'
        }

        // Create hidden inputs for form data
        Object.keys(templateParams).forEach(key => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = templateParams[key]
          form.appendChild(input)
        })

        // Create file input for attachment
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.name = 'attachment'
        fileInput.style.display = 'none'
        
        // Create a FileList with our audio file
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(audioFile)
        fileInput.files = dataTransfer.files
        form.appendChild(fileInput)
        
        document.body.appendChild(form)

        // Send email with attachment using EmailJS sendForm
        await emailjs.sendForm(emailjsServiceId, emailjsTemplateId, form, {
          publicKey: emailjsPublicKey
        })

        // Clean up
        document.body.removeChild(form)

        setRecordingStatus('✅ Email sent successfully with voice attachment!')
        setTimeout(() => {
          setRecordingStatus('')
          onClose()
        }, 3000)
      } else {
        // Fallback: Automatically download file and open email compose
        const url = URL.createObjectURL(recordedBlob)
        const downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.download = fileName
        downloadLink.style.display = 'none'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        
        // Open Gmail compose with pre-filled content
        const subject = encodeURIComponent(`🎄 Christmas Voice Message from ${displayName} - Global South Incubator`)
        const body = encodeURIComponent(emailBody + `\n\n📎 The voice message file (${fileName}) has been downloaded to your device. Please attach it to this email before sending.`)
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${teamEmail}&su=${subject}&body=${body}`
        
        setRecordingStatus(`✅ Audio file downloaded! Opening Gmail...
        
📎 Please attach the downloaded file (${fileName}) to the email.
📍 It's usually in your Downloads folder.
👤 Recipient: ${teamEmail}`)
        
        // Open email compose after a brief delay
        setTimeout(() => {
          window.open(gmailLink, '_blank')
          setRecordingStatus(`✅ Email compose opened! 
          
📎 Don't forget to attach the file: ${fileName}
📍 Check your Downloads folder if you don't see it.`)
        }, 800)
        
        setTimeout(() => URL.revokeObjectURL(url), 2000)
      }
    } catch (error) {
      console.error('Error sending email:', error)
      
      // Fallback to download method
      const fileName = `christmas-message-${displayName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.webm`
      const url = URL.createObjectURL(recordedBlob)
      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.download = fileName
      downloadLink.style.display = 'none'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      
      const subject = encodeURIComponent(`🎄 Christmas Voice Message from ${displayName} - Global South Incubator`)
      const body = encodeURIComponent(`Dear Global South Incubator Team,\n\n🎄 Christmas Voice Message 🎄\n\nA team member has recorded a special Christmas voice message for the team!\n\nFrom: ${displayName}\nDate: ${timestamp}\nCompany: Global South Incubator\n\n📎 Please attach the downloaded audio file (${fileName}) to this email.\n\nWishing everyone a Merry Christmas and a Happy New Year! 🎄✨\n\n---\nThis platform was created by Joash as a gift to celebrate our team.`)
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${teamEmail}&su=${subject}&body=${body}`
      
      setRecordingStatus(`⚠️ EmailJS error. Using manual method...
      
📎 File downloaded: ${fileName}
📧 Opening Gmail compose...
👤 Recipient: ${teamEmail}`)
      
      setTimeout(() => {
        window.open(gmailLink, '_blank')
        setRecordingStatus(`✅ Gmail opened! Please attach the file: ${fileName}`)
      }, 800)
      
      setTimeout(() => URL.revokeObjectURL(url), 2000)
    }
  }

  return (
    <div className="fixed top-3 right-3 left-3 sm:top-5 sm:right-5 sm:left-auto z-[1000] animate-[fadeInUp_1s_ease-out] max-w-sm mx-auto sm:mx-0">
      <div className="bg-white/95 rounded-[15px] sm:rounded-[20px] p-4 sm:p-5 text-center shadow-2xl backdrop-blur-md border-2 border-white/30 w-full">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="font-dancing text-lg sm:text-3xl text-green-700 m-0 pr-2">🎤 Record a Christmas Message 🎤</h3>
          <button
            onClick={onClose}
            className="bg-black/10 border-none text-2xl sm:text-3xl text-gray-400 cursor-pointer p-1.5 sm:p-2 rounded-full transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-black/20 hover:text-gray-800 hover:scale-110 flex-shrink-0"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col gap-2.5 mb-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 border-none rounded-[20px] text-sm font-medium cursor-pointer transition-all duration-300 w-full ${
              isRecording
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white animate-pulse'
                : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:-translate-y-0.5 hover:shadow-lg'
            }`}
          >
            <span>{isRecording ? '⏹️' : '🎤'}</span>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          <button
            onClick={playRecording}
            disabled={!audioUrl}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white border-none rounded-[20px] text-sm font-medium cursor-pointer transition-all duration-300 w-full hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <span>▶️</span>
            Play Message
          </button>
          <button
            onClick={handleSend}
            disabled={!recordedBlob}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-green-600 to-red-600 text-white border-none rounded-[20px] text-sm font-medium cursor-pointer transition-all duration-300 w-full hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <span>📧</span>
            Send to Team
          </button>
        </div>
        {recordingStatus && (
          <div className="text-green-700 font-medium mb-4 min-h-5 whitespace-pre-line text-sm">
            {recordingStatus}
          </div>
        )}
        <div className="text-green-700 italic text-xs sm:text-base">
          Record a special Christmas message for the Global South Incubator team!
        </div>
      </div>
    </div>
  )
}

