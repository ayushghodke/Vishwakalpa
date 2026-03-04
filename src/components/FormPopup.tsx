import { memo } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import type { SubmitResult } from '../types/form';

interface FormPopupProps {
    submitResult: SubmitResult;
    onClose: () => void;
}

const FormPopup = memo(({ submitResult, onClose }: FormPopupProps) => {
    if (submitResult === 'idle') return null;

    return (
        <div className="form-popup-overlay" onClick={onClose}>
            <div
                className="form-popup-card glass-panel animate-fade-in"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={submitResult === 'success' ? 'Success' : 'Error'}
            >
                <button className="form-popup-close" onClick={onClose} aria-label="Close popup">
                    <X size={24} />
                </button>

                {submitResult === 'success' ? (
                    <div className="form-popup-content">
                        <CheckCircle2 className="text-accent form-popup-icon mb-4" size={64} />
                        <h3>Thank You!</h3>
                        <p>Your message has been sent. Our experts will reach out to you shortly.</p>
                    </div>
                ) : (
                    <div className="form-popup-content">
                        <h3>Oops!</h3>
                        <p>Something went wrong. Please try again later.</p>
                    </div>
                )}

                <button className="btn btn-primary form-popup-btn w-full mt-6" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
});

FormPopup.displayName = 'FormPopup';

export default FormPopup;
