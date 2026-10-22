// js/login.js
import { auth, db } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// State management
let currentUserType = null;
let currentTab = 'login';

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  showTab('login');
});

// Show tab (Login or Register)
window.showTab = function(tab) {
  currentTab = tab;
  const container = document.getElementById('loginContainer');
  
  if (tab === 'login') {
    showLoginOptions(container);
  } else {
    showRegisterOptions(container);
  }
};

// Show login options (circle selection)
function showLoginOptions(container) {
  container.innerHTML = `
    <div class="tab-container">
      <button class="tab-btn active" onclick="showTab('login')">
        <i class="fas fa-sign-in-alt"></i> Login
      </button>
      <button class="tab-btn" onclick="showTab('register')">
        <i class="fas fa-user-plus"></i> Register
      </button>
    </div>
    
    <div class="content-area">
      <div class="header">
        <h2>Welcome Back! 👋</h2>
        <p>Choose your role to continue</p>
      </div>
      
      <div class="circle-grid">
        <div class="circle-item" onclick="showLoginForm('citizen')">
          <div class="circle citizen">
            <i class="fas fa-user"></i>
          </div>
          <span>Citizen</span>
        </div>
        
        <div class="circle-item" onclick="showLoginForm('collector')">
          <div class="circle collector">
            <i class="fas fa-truck"></i>
          </div>
          <span>Collector</span>
        </div>
        
        <div class="circle-item" onclick="showLoginForm('admin')">
          <div class="circle admin">
            <i class="fas fa-shield-alt"></i>
          </div>
          <span>Admin</span>
        </div>
      </div>
      
      <div class="form-footer">
        <span>Don't have an account?</span>
        <a href="#" onclick="showTab('register')">Register here</a>
      </div>
    </div>
  `;
}

// Show register options (citizen/collector only)
function showRegisterOptions(container) {
  container.innerHTML = `
    <div class="tab-container">
      <button class="tab-btn" onclick="showTab('login')">
        <i class="fas fa-sign-in-alt"></i> Login
      </button>
      <button class="tab-btn active" onclick="showTab('register')">
        <i class="fas fa-user-plus"></i> Register
      </button>
    </div>
    
    <div class="content-area">
      <div class="header">
        <h2>Create Account 🚀</h2>
        <p>Select your account type</p>
      </div>
      
      <div class="circle-grid">
        <div class="circle-item" onclick="showRegisterForm('citizen')">
          <div class="circle citizen">
            <i class="fas fa-user"></i>
          </div>
          <span>Citizen</span>
          <small style="color: #64748b; display: block; margin-top: 5px;">For residents</small>
        </div>
        
        <div class="circle-item" onclick="showRegisterForm('collector')">
          <div class="circle collector">
            <i class="fas fa-truck"></i>
          </div>
          <span>Collector</span>
          <small style="color: #64748b; display: block; margin-top: 5px;">For waste collectors</small>
        </div>
      </div>
      
      <div class="form-footer">
        <span>Already have an account?</span>
        <a href="#" onclick="showTab('login')">Login here</a>
      </div>
    </div>
  `;
}

// Show login form for specific user type
window.showLoginForm = function(userType) {
  currentUserType = userType;
  const container = document.getElementById('loginContainer');
  
  const titles = {
    citizen: { title: 'Citizen Login', icon: 'fa-user', color: '#2ecc71' },
    collector: { title: 'Collector Login', icon: 'fa-truck', color: '#3498db' },
    admin: { title: 'Admin Login', icon: 'fa-shield-alt', color: '#9b59b6' }
  };
  
  const user = titles[userType];
  
  container.innerHTML = `
    <div class="tab-container">
      <button class="tab-btn active" onclick="showTab('login')">
        <i class="fas fa-sign-in-alt"></i> Login
      </button>
      <button class="tab-btn" onclick="showTab('register')">
        <i class="fas fa-user-plus"></i> Register
      </button>
    </div>
    
    <div class="content-area">
      <button class="back-btn" onclick="showTab('login')">
        <i class="fas fa-arrow-left"></i> Back to role selection
      </button>
      
      <div class="header" style="text-align: center;">
        <div class="circle" style="width: 80px; height: 80px; margin: 0 auto 20px; background: ${user.color}; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
          <i class="fas ${user.icon}" style="font-size: 32px; color: white;"></i>
        </div>
        <h2>${user.title}</h2>
        <p>Enter your credentials to continue</p>
      </div>
      
      <div id="messageContainer" class="message-container"></div>
      
      <div class="form-container">
        <form id="loginForm" onsubmit="handleLogin(event, '${userType}')">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="loginEmail" required placeholder="Enter your email">
          </div>
          
          <div class="form-group password-toggle">
            <label>Password</label>
            <input type="password" id="loginPassword" required placeholder="Enter your password">
            <button type="button" class="toggle-password" onclick="togglePassword('loginPassword')">
              <i class="fas fa-eye"></i>
            </button>
          </div>
          
          <div class="forgot-password">
            <a href="#" onclick="showForgotPassword('${userType}')">Forgot password?</a>
          </div>
          
          <button type="submit" class="submit-btn" id="loginBtn">
            <i class="fas fa-sign-in-alt"></i> Login
          </button>
        </form>
      </div>
      
      <div class="form-footer">
        <span>Don't have an account?</span>
        <a href="#" onclick="showRegisterForm('${userType}')">Register as ${userType}</a>
      </div>
    </div>
  `;
};

// Show register form for specific user type
window.showRegisterForm = function(userType) {
  currentUserType = userType;
  const container = document.getElementById('loginContainer');
  
  const titles = {
    citizen: { title: 'Citizen Registration', icon: 'fa-user', color: '#2ecc71' },
    collector: { title: 'Collector Registration', icon: 'fa-truck', color: '#3498db' }
  };
  
  const user = titles[userType];
  
  let formHtml = `
    <div class="tab-container">
      <button class="tab-btn" onclick="showTab('login')">
        <i class="fas fa-sign-in-alt"></i> Login
      </button>
      <button class="tab-btn active" onclick="showTab('register')">
        <i class="fas fa-user-plus"></i> Register
      </button>
    </div>
    
    <div class="content-area">
      <button class="back-btn" onclick="showTab('register')">
        <i class="fas fa-arrow-left"></i> Back to registration options
      </button>
      
      <div class="header" style="text-align: center;">
        <div class="circle" style="width: 80px; height: 80px; margin: 0 auto 20px; background: ${user.color}; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
          <i class="fas ${user.icon}" style="font-size: 32px; color: white;"></i>
        </div>
        <h2>${user.title}</h2>
        <p>Create your account to get started</p>
      </div>
      
      <div id="messageContainer" class="message-container"></div>
      
      <div class="form-container">
        <form id="registerForm" onsubmit="handleRegister(event, '${userType}')">
  `;
  
  if (userType === 'citizen') {
    formHtml += `
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" id="firstName" required placeholder="John">
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" id="lastName" required placeholder="Doe">
            </div>
          </div>
          
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="email" required placeholder="john@example.com">
          </div>
          
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" id="phone" required placeholder="+91 98765 43210">
          </div>
          
          <div class="form-group">
            <label>Address</label>
            <input type="text" id="address" required placeholder="Enter your address">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>City</label>
              <input type="text" id="city" required placeholder="Mumbai">
            </div>
            <div class="form-group">
              <label>ZIP Code</label>
              <input type="text" id="zipCode" required placeholder="400001">
            </div>
          </div>
    `;
  } else if (userType === 'collector') {
    formHtml += `
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="fullName" required placeholder="John Doe">
          </div>
          
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="email" required placeholder="john@example.com">
          </div>
          
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" id="phone" required placeholder="+91 98765 43210">
          </div>
          
          <div class="collector-fields">
            <h4>Professional Details</h4>
            
            <div class="form-group">
              <label>Employee ID</label>
              <input type="text" id="employeeId" required placeholder="COL001">
            </div>
            
            <div class="form-group">
              <label>Assigned Zone</label>
              <select id="zone" required>
                <option value="">Select Zone</option>
                <option value="north">North Zone</option>
                <option value="south">South Zone</option>
                <option value="east">East Zone</option>
                <option value="west">West Zone</option>
                <option value="central">Central Zone</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Vehicle Number</label>
              <input type="text" id="vehicleNumber" required placeholder="MH 01 AB 1234">
            </div>
          </div>
    `;
  }
  
  formHtml += `
          <div class="form-row">
            <div class="form-group password-toggle">
              <label>Password</label>
              <input type="password" id="password" required minlength="6" placeholder="Min. 6 characters">
              <button type="button" class="toggle-password" onclick="togglePassword('password')">
                <i class="fas fa-eye"></i>
              </button>
            </div>
            
            <div class="form-group password-toggle">
              <label>Confirm Password</label>
              <input type="password" id="confirmPassword" required placeholder="Re-enter password">
              <button type="button" class="toggle-password" onclick="togglePassword('confirmPassword')">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          
          <button type="submit" class="submit-btn" id="registerBtn">
            <i class="fas fa-user-plus"></i> Create Account
          </button>
        </form>
      </div>
      
      <div class="form-footer">
        <span>Already have an account?</span>
        <a href="#" onclick="showLoginForm('${userType}')">Login as ${userType}</a>
      </div>
    </div>
  `;
  
  container.innerHTML = formHtml;
};

// Handle login
window.handleLogin = async function(event, userType) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (!email || !password) {
    showMessage('Please enter email and password', 'error');
    return;
  }
  
  setLoading(true, 'loginBtn');
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    
    const userData = userDoc.data();
    
    // Verify user type matches
    if (userData.userType !== userType) {
      await signOut(auth);
      showMessage(`This account is registered as ${userData.userType}`, 'error');
      setLoading(false, 'loginBtn');
      return;
    }
    
    // Check if account is active
    if (userData.isActive === false) {
      await signOut(auth);
      showMessage('Account deactivated. Contact support.', 'error');
      setLoading(false, 'loginBtn');
      return;
    }
    
    // Show success message
    showLoginSuccess(userType);
    
  } catch (error) {
    console.error('Login error:', error);
    setLoading(false, 'loginBtn');
    
    let message = 'Login failed. Please try again.';
    if (error.code === 'auth/user-not-found') message = 'No account found with this email';
    else if (error.code === 'auth/wrong-password') message = 'Incorrect password';
    else if (error.code === 'auth/invalid-email') message = 'Invalid email address';
    else if (error.code === 'auth/user-disabled') message = 'Account has been disabled';
    
    showMessage(message, 'error');
  }
};

// Handle registration
window.handleRegister = async function(event, userType) {
  event.preventDefault();
  
  // Get common fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const phone = document.getElementById('phone').value;
  
  // Validate passwords
  if (password !== confirmPassword) {
    showMessage('Passwords do not match!', 'error');
    return;
  }
  
  if (password.length < 6) {
    showMessage('Password must be at least 6 characters', 'error');
    return;
  }
  
  setLoading(true, 'registerBtn');
  
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Prepare user data
    const userData = {
      email: email,
      phone: phone,
      userType: userType,
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      updatedAt: serverTimestamp()
    };
    
    // Add type-specific fields
    if (userType === 'citizen') {
      userData.firstName = document.getElementById('firstName').value;
      userData.lastName = document.getElementById('lastName').value;
      userData.name = `${userData.firstName} ${userData.lastName}`;
      userData.address = document.getElementById('address').value;
      userData.city = document.getElementById('city').value;
      userData.zipCode = document.getElementById('zipCode').value;
      userData.greenPoints = 0;
      userData.totalPickups = 0;
    } else if (userType === 'collector') {
      userData.name = document.getElementById('fullName').value;
      userData.employeeId = document.getElementById('employeeId').value;
      userData.assignedZone = document.getElementById('zone').value;
      userData.vehicleNumber = document.getElementById('vehicleNumber').value;
      userData.isAvailable = true;
      userData.totalPickups = 0;
      userData.totalWaste = 0;
    }
    
    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), userData);
    
    // Show success message
    showRegistrationSuccess(userType);
    
  } catch (error) {
    console.error('Registration error:', error);
    setLoading(false, 'registerBtn');
    
    let message = 'Registration failed. Please try again.';
    if (error.code === 'auth/email-already-in-use') message = 'Email already registered';
    else if (error.code === 'auth/invalid-email') message = 'Invalid email address';
    else if (error.code === 'auth/weak-password') message = 'Password is too weak';
    
    showMessage(message, 'error');
  }
};

// Show forgot password
window.showForgotPassword = function(userType) {
  const container = document.getElementById('loginContainer');
  
  container.innerHTML = `
    <div class="tab-container">
      <button class="tab-btn" onclick="showTab('login')">
        <i class="fas fa-sign-in-alt"></i> Login
      </button>
      <button class="tab-btn" onclick="showTab('register')">
        <i class="fas fa-user-plus"></i> Register
      </button>
    </div>
    
    <div class="content-area">
      <button class="back-btn" onclick="showLoginForm('${userType}')">
        <i class="fas fa-arrow-left"></i> Back to login
      </button>
      
      <div class="header">
        <h2>Reset Password</h2>
        <p>Enter your email to receive reset instructions</p>
      </div>
      
      <div id="messageContainer" class="message-container"></div>
      
      <div class="form-container">
        <form onsubmit="handleForgotPassword(event, '${userType}')">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="resetEmail" required placeholder="Enter your email">
          </div>
          
          <button type="submit" class="submit-btn" id="resetBtn">
            <i class="fas fa-paper-plane"></i> Send Reset Link
          </button>
        </form>
      </div>
    </div>
  `;
};

// Handle forgot password
window.handleForgotPassword = async function(event, userType) {
  event.preventDefault();
  
  const email = document.getElementById('resetEmail').value;
  
  setLoading(true, 'resetBtn');
  
  try {
    await sendPasswordResetEmail(auth, email);
    
    const container = document.getElementById('loginContainer');
    container.innerHTML = `
      <div class="tab-container">
        <button class="tab-btn" onclick="showTab('login')">
          <i class="fas fa-sign-in-alt"></i> Login
        </button>
        <button class="tab-btn" onclick="showTab('register')">
          <i class="fas fa-user-plus"></i> Register
        </button>
      </div>
      
      <div class="content-area">
        <div class="success-animation">
          <i class="fas fa-envelope-circle-check"></i>
          <h2>Check Your Email</h2>
          <p>We've sent password reset instructions to<br><strong>${email}</strong></p>
          <button class="submit-btn" onclick="showLoginForm('${userType}')" style="margin-top: 20px;">
            Back to Login
          </button>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Password reset error:', error);
    showMessage('Error sending reset email. Please try again.', 'error');
    setLoading(false, 'resetBtn');
  }
};

// Show login success
function showLoginSuccess(userType) {
  const container = document.getElementById('loginContainer');
  
  container.innerHTML = `
    <div class="content-area">
      <div class="success-animation">
        <i class="fas fa-circle-check"></i>
        <h2>Login Successful!</h2>
        <p>Welcome back! Redirecting to your dashboard...</p>
        <div class="spinner" style="width: 40px; height: 40px; margin: 20px auto;"></div>
      </div>
    </div>
  `;
  
  // Redirect to appropriate dashboard
  setTimeout(() => {
    if (userType === 'citizen') window.location.href = 'citizen_dashboard.html';
    else if (userType === 'collector') window.location.href = 'collector_dashboard.html';
    else if (userType === 'admin') window.location.href = 'admin_dashboard.html';
  }, 2000);
}

// Show registration success
function showRegistrationSuccess(userType) {
  const container = document.getElementById('loginContainer');
  
  container.innerHTML = `
    <div class="content-area">
      <div class="success-animation">
        <i class="fas fa-circle-check"></i>
        <h2>Registration Successful!</h2>
        <p>Your account has been created successfully.</p>
        <button class="submit-btn" onclick="showLoginForm('${userType}')" style="margin-top: 20px;">
          Proceed to Login
        </button>
      </div>
    </div>
  `;
}

// Show message in container
function showMessage(message, type) {
  const container = document.getElementById('messageContainer');
  if (container) {
    container.innerHTML = `
      <div class="message ${type}">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      container.innerHTML = '';
    }, 5000);
  }
}

// Set loading state
function setLoading(isLoading, buttonId) {
  const btn = document.getElementById(buttonId);
  if (btn) {
    btn.disabled = isLoading;
    btn.innerHTML = isLoading ? 
      '<i class="fas fa-spinner fa-spin"></i> Processing...' : 
      btn.innerHTML;
  }
}

// Toggle password visibility
window.togglePassword = function(inputId) {
  const input = document.getElementById(inputId);
  const icon = event.currentTarget.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
};