let currentStep = 1;
const totalSteps = 3;

function showStep(step) {
  for (let i = 1; i <= totalSteps; i++) {
    document.getElementById(`Step${i}`).style.display = i === step ? 'block' : 'none';
  }
  
  document.getElementById('prevBtn').style.display = step > 1 ? 'inline-block' : 'none';
  document.getElementById('nextBtn').style.display = step <= totalSteps ? 'inline-block' : 'none';
  
  if (step === totalSteps) {
    document.getElementById('nextBtn').textContent = 'Terminer';
    document.getElementById('nextBtn').href = 'index.html';
  } else {
    document.getElementById('nextBtn').textContent = 'Suivant →';
    document.getElementById('nextBtn').href = '#';
  }
}

document.getElementById('nextBtn').addEventListener('click', function(e) {
  if (currentStep < totalSteps) {
    e.preventDefault();
    currentStep++;
    showStep(currentStep);
  }
});

document.getElementById('prevBtn').addEventListener('click', function(e) {
  e.preventDefault();
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
});

showStep(1);