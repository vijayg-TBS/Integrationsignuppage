import { useState } from "react";
import { X, Eye, EyeOff, Mail, CheckCircle2, Building2, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import taxBanditsLogo from "figma:asset/d44c246ce83f0cebb9cbe85308aa8befe9e5fea4.png";

interface TaxBanditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = "email" | "password" | "not-found" | "tin-verification";
type VerificationStatus = null | "success" | "not-found";

// Mock function to simulate email verification
const checkEmailExists = (email: string): boolean => {
  // Check if email is from taxbandits.com domain
  return email.toLowerCase().endsWith("@taxbandits.com");
};

// Mock function to verify if business exists in TaxBandits with the given EIN
const checkBusinessExists = (ein: string, email: string): boolean => {
  // In a real app, this would verify against TaxBandits API
  // For demo: accept "12-3456789" or "123456789" as existing business
  const normalizedEIN = ein.replace(/[^0-9]/g, '');
  return normalizedEIN === "123456789";
};

export function TaxBanditsModal({ isOpen, onClose }: TaxBanditsModalProps) {
  const [step, setStep] = useState<ModalStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [ein, setEin] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Check if email exists in TaxBandits
    const exists = checkEmailExists(email);
    
    if (exists) {
      setStep("password");
    } else {
      setStep("not-found");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter your password");
      return;
    }

    // Mock login - in real app, this would call an API
    console.log("Logging in with:", email, password);
    
    // Move to EIN verification step
    setStep("tin-verification");
    setVerificationStatus(null);
  };

  const handleEinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!ein) {
      setError("Please enter your Business EIN");
      return;
    }

    // Validate EIN format (XX-XXXXXXX or XXXXXXXXX)
    const einRegex = /^\d{2}-?\d{7}$/;
    if (!einRegex.test(ein)) {
      setError("Please enter a valid EIN (format: XX-XXXXXXX)");
      return;
    }

    setIsVerifying(true);
    
    // Mock EIN verification - in real app, this would verify against TaxBandits API
    setTimeout(() => {
      const businessExists = checkBusinessExists(ein, email);
      setIsVerifying(false);
      
      if (businessExists) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("not-found");
      }
    }, 1500);
  };

  const handleConnectBusiness = () => {
    alert(`Successfully connected to TaxBandits!\nBusiness EIN: ${ein}\nEmail: ${email}`);
    handleClose();
  };

  const handleClose = () => {
    setStep("email");
    setEmail("");
    setPassword("");
    setError("");
    setShowPassword(false);
    setEin("");
    setIsVerifying(false);
    setVerificationStatus(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0" aria-describedby={undefined}>
        <DialogTitle className="sr-only">
          {step === "email" && "Sign In with your email"}
          {step === "password" && "Sign In with your email"}
          {step === "not-found" && "Account Not Found"}
          {step === "tin-verification" && "Verify Business TIN"}
        </DialogTitle>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex-1">
            <img 
              src={taxBanditsLogo} 
              alt="TaxBandits" 
              className="h-8 mb-3"
            />
            <h2 className="text-xl font-semibold">
              {step === "email" && "Sign In with your email"}
              {step === "password" && "Sign In with your email"}
              {step === "not-found" && "Account Not Found"}
              {step === "tin-verification" && "Verify Business TIN"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="text-center mb-4">
                
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Get Started
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign in with</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>SSO</span>
                </button>
              </div>

              <div className="flex justify-center gap-2 pt-4">
                <button
                  type="button"
                  className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <span className="text-xl">🪟</span>
                </button>
                <button
                  type="button"
                  className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <span className="text-xl">🍎</span>
                </button>
                <button
                  type="button"
                  className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#2C5F8D">
                    <path d="M23.004 11.505C23.004 5.151 17.85 0 11.498 0 5.145 0 0 5.151 0 11.505c0 5.708 4.146 10.46 9.626 11.505v-8.196H6.733v-3.309h2.893V8.979c0-2.863 1.702-4.447 4.315-4.447 1.252 0 2.56.223 2.56.223v2.816h-1.443c-1.42 0-1.863.881-1.863 1.785v2.149h3.17l-.507 3.309h-2.663v8.196C18.858 21.965 23.004 17.213 23.004 11.505z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#00B2A9">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </button>
              </div>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="text-center mb-4">
                
              </div>

              <div>
                <label
                  htmlFor="email-display"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email-display"
                    value={email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 pr-10"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Sign In
              </button>
            </form>
          )}

          {step === "not-found" && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Account Found
                </h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find an account associated with{" "}
                  <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Please sign up for a TaxBandits account to continue.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://www.taxbandits.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors text-center"
                >
                  Sign Up at TaxBandits
                </a>
                <button
                  onClick={() => setStep("email")}
                  className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Try Different Email
                </button>
              </div>
            </div>
          )}

          {step === "tin-verification" && (
            <div className="space-y-6">
              {verificationStatus === null && (
                <>
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Verify Your Business
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Enter the Business EIN associated with{" "}
                      <span className="font-medium">{email}</span>
                    </p>
                  </div>

                  <form onSubmit={handleEinSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="ein"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Business EIN
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="ein"
                          value={ein}
                          onChange={(e) => setEin(e.target.value)}
                          placeholder="XX-XXXXXXX"
                          disabled={isVerifying}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                        />
                        <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isVerifying ? "Verifying..." : "Verify EIN"}
                    </button>
                  </form>
                </>
              )}

              {verificationStatus === "success" && (
                <>
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Business Verified Successfully!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Business found in TaxBandits for{" "}
                      <span className="font-medium">{email}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      EIN: <span className="font-medium">{ein}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleConnectBusiness}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Connect Business
                  </button>
                </>
              )}

              {verificationStatus === "not-found" && (
                <>
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Business Not Found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find a business with EIN{" "}
                      <span className="font-medium">{ein}</span> associated with{" "}
                      <span className="font-medium">{email}</span> in TaxBandits.
                    </p>
                    <p className="text-sm text-gray-500">
                      Please verify the EIN and try again.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setVerificationStatus(null);
                      setEin("");
                      setError("");
                    }}
                    className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Try Different EIN
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}