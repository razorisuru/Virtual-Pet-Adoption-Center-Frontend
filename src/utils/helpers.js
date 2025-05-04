// Pet species options
export const PET_SPECIES = [
  'Dog',
  'Cat',
  'Rabbit',
  'Bird',
  'Hamster',
  'Guinea Pig',
  'Ferret',
  'Fish',
  'Turtle',
  'Other'
];

// Pet personality traits
export const PET_PERSONALITIES = [
  'Friendly',
  'Shy',
  'Energetic',
  'Calm',
  'Playful',
  'Independent',
  'Affectionate',
  'Curious',
  'Reserved',
  'Outgoing'
];

// Mood colors and icons mapping
export const MOOD_CONFIG = {
  Happy: {
    color: 'bg-happy',
    textColor: 'text-white',
    icon: '😊',
    description: 'This pet is feeling great!'
  },
  Excited: {
    color: 'bg-excited',
    textColor: 'text-white',
    icon: '🤩',
    description: 'This pet is feeling very enthusiastic!'
  },
  Sad: {
    color: 'bg-sad',
    textColor: 'text-white',
    icon: '😢',
    description: 'This pet is feeling a bit down. Consider adoption!'
  }
};

// Default pet image by species
export const PET_IMAGES = {
  Dog: '../assets/images/dog.png',
  Cat: '../assets/images/cat.png',
  Rabbit: '../assets/images/rabbit.png',
  Ferret: '../assets/images/ferret.png',
  Hamster: '../assets/images/hamster.png',
  Iguana: '../assets/images/iguana.png',
  // Add more species images as needed
  default: '../assets/images/other-animals.svg'
};

// Get pet image based on species
export const getPetImage = (species) => {
  return PET_IMAGES[species] || PET_IMAGES.default;
};

// Format date to readable string
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Delay helper
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate confetti effect
export const generateConfetti = () => {
  // Simple confetti effect using emojis
  const confettiContainer = document.createElement('div');
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.top = '0';
  confettiContainer.style.left = '0';
  confettiContainer.style.width = '100%';
  confettiContainer.style.height = '100%';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.zIndex = '9999';
  document.body.appendChild(confettiContainer);

  const emojis = ['🎉', '🎊', '✨', '⭐', '🌟'];
  const pieces = 50;

  for (let i = 0; i < pieces; i++) {
    const emoji = document.createElement('span');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'absolute';
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animationDuration = Math.random() * 3 + 2 + 's';
    emoji.style.opacity = '0';
    emoji.style.fontSize = Math.random() * 24 + 10 + 'px';
    emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
    emoji.style.animation = 'fall linear forwards';
    confettiContainer.appendChild(emoji);
  }

  // Remove confetti after animation
  setTimeout(() => {
    document.body.removeChild(confettiContainer);
  }, 5000);
};

// Add CSS animation for confetti
if (!document.getElementById('confetti-style')) {
  const style = document.createElement('style');
  style.id = 'confetti-style';
  style.textContent = `
    @keyframes fall {
      0% {
        transform: translateY(-100vh) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}