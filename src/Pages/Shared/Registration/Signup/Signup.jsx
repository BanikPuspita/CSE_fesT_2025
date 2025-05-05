import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./SignUp.css";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
          role: "user",
        });

        toast.success("User Registered Successfully!!", { position: "top-center" });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message || "Registration failed. Try again.", { position: "bottom-center" });
    }
  };

  return (
    <div className="signup-container">
      <section className="signup-info-section">
        <h2>Join Us Today!</h2>
        <p>
          Signing up gives you exclusive access to personalized features, a supportive community, and top-tier resources.  
          Get started now and experience the best platform for your needs!
        </p>
      </section>

      <form onSubmit={handleRegister}>
        <h3>Sign Up</h3>

        <div className="signup-info">
          <label>First Name</label>
          <input type="text" placeholder="First name" onChange={(e) => setFname(e.target.value)} required />
        </div>

        <div className="signup-info">
          <label>Last Name</label>
          <input type="text" placeholder="Last name" onChange={(e) => setLname(e.target.value)} />
        </div>

        <div className="signup-info">
          <label>Email Address</label>
          <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="signup-info">
          <label>Password</label>
          <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="signup-submit">
          <button type="submit" className="bttn">Sign Up</button>
        </div>
        <p className="forgot-password">
          Already registered? <a href="/login">Log In</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;