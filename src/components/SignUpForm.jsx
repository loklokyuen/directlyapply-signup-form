import { useState } from "react";

const SignUpForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [referrer, setReferrer] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [referrerError, setReferrerError] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/;

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const handleEmailInput = (event) => {
		setEmail(event.target.value);
		setEmailError("");
	};

	const validateEmail = () => {
		if (!emailPattern.test(email)) {
			setEmailError("Please enter a valid email address.");
		} else {
			setEmailError("");
		}
	};

	const handlePasswordInput = (event) => {
		setPassword(event.target.value);
		setPasswordError("");
		setConfirmPasswordError("");
	};

	const validatePassword = () => {
		if (password.trim() === "") {
			setPasswordError("Password cannot be empty.");
		} else {
			setPasswordError("");
		}
	};

	const handleConfirmPasswordInput = (event) => {
		setConfirmPassword(event.target.value);
		setConfirmPasswordError("");
	};

	const validateConfirmPassword = () => {
		if (confirmPassword !== password) {
			setConfirmPasswordError("Passwords do not match.");
		} else {
			setConfirmPasswordError("");
		}
	};

	const handleReferrerInput = (event) => {
		const referrer = event.target.value;
		setReferrer(referrer);
		setReferrerError("");
	};

	const validateReferrer = () => {
		if (referrer === "") {
			setReferrerError("Please select how you find out about us.");
		} else {
			setReferrerError("");
		}
	};

	const validateForm = () => {
		let isValid = true;
		// Validate email
		if (!email || !emailPattern.test(email)) {
			setEmailError("Please enter a valid email address.");
			isValid = false;
		}

		// Validate password
		if (!password.trim()) {
			setPasswordError("Password cannot be empty.");
			isValid = false;
		}

		// Validate confirm password
		if (!confirmPassword || confirmPassword !== password) {
			setConfirmPasswordError("Passwords do not match.");
			isValid = false;
		}

		// Validate referrer
		if (!referrer) {
			setReferrerError("Please select how you heard about us.");
			isValid = false;
		}
		return isValid;
	};

	// Handle form submission: validate, log user data, and reset form
	const handleSubmit = (event) => {
		event.preventDefault();
		if (!validateForm()) {
			// Prevent form submission if there are errors
			alert("Please fix the errors before submitting the form.");
			return;
		}
		const userInfo = {
			email,
			password,
			confirmPassword,
			referrer,
		};
		console.log("User registered with:", userInfo);
		setIsSubmitted(true);
		setTimeout(() => {
			setIsSubmitted(false);
			setEmail("");
			setPassword("");
			setConfirmPassword("");
			setReferrer("");
			setEmailError("");
			setPasswordError("");
			setConfirmPasswordError("");
			setReferrerError("");
			setIsPasswordVisible(false);
		}, 3000);
	};

	return (
		<section className="sign-up-form flex flex-col items-center justify-center bg-purple-50 rounded-xl w-full overflow-hidden shadow-lg p-8 mt-10">
			<h2 className="text-2xl font-semibold">Sign Up</h2>
			<form className="mt-4" onSubmit={handleSubmit}>
				<div className="sign-up-section">
					<label htmlFor="email" className="sign-up-label">
						Email
					</label>
					<input
						className={`sign-up-input ${emailError ? "error" : ""}`}
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={handleEmailInput}
						onBlur={validateEmail}
					/>
					{emailError && <p className="error-text">{emailError}</p>}
				</div>
				<div className="sign-up-section">
					<label htmlFor="password" className="sign-up-label">
						Password
					</label>
					<div className="relative">
						<input
							className={`sign-up-input ${passwordError ? "error" : ""}`}
							type={`${isPasswordVisible ? "text" : "password"}`}
							id="password"
							name="password"
							value={password}
							onChange={handlePasswordInput}
							onBlur={validatePassword}
						/>
						<div
							className="absolute inset-y-0 end-2 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
							aria-label={isPasswordVisible ? "Hide password" : "Show password"}
							onClick={togglePasswordVisibility}>
							{isPasswordVisible ? (
								<i className="fa-regular fa-eye-slash"></i>
							) : (
								<i className="fa-regular fa-eye"></i>
							)}
						</div>
					</div>
					{passwordError && <p className="error-text">{passwordError}</p>}
				</div>
				<div className="sign-up-section">
					<label htmlFor="confirm-password" className="sign-up-label">
						Confirm Password
					</label>
					<input
						className={`sign-up-input ${confirmPasswordError ? "error" : ""}`}
						type="password"
						id="confirm-password"
						name="confirm-password"
						value={confirmPassword}
						onChange={handleConfirmPasswordInput}
						onBlur={validateConfirmPassword}
					/>
					{confirmPasswordError && (
						<p className="error-text">{confirmPasswordError}</p>
					)}
				</div>
				<div className="sign-up-section">
					<label htmlFor="referrer" className="sign-up-label">
						How did you find out about us?
					</label>
					<select
						className={`sign-up-input ${referrerError ? "error" : ""}`}
						id="referrer"
						name="referrer"
						value={referrer}
						onChange={handleReferrerInput}
						onBlur={validateReferrer}>
						<option value="">Select an option</option>
						<option value="search_engine">Search Engine</option>
						<option value="friend">Friend</option>
						<option value="social_media">Social Media</option>
						<option value="other">Other</option>
					</select>
					{referrerError && <p className="error-text">{referrerError}</p>}
				</div>
				<button
					type="submit"
					disabled={isSubmitted}
					className={`sign-up-button bg-purple-500 text-white mt-2 hover:bg-purple-700 ${
						isSubmitted
							? "opacity-50 bg-purple-300  hover:bg-purple-300 cursor-not-allowed "
							: ""
					}`}>
					Sign up
				</button>
				{isSubmitted && (
					<p className="bg-green-200 py-4 rounded-md text-sm m-2">
						Signup successful!
					</p>
				)}
			</form>
		</section>
	);
};

export default SignUpForm;
