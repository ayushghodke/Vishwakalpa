import { useState, useCallback } from 'react';
import type { SubmitResult } from '../types/form';
import { WEB3FORMS_ENDPOINT } from '../constants/config';

export const useWeb3Form = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<SubmitResult>('idle');

    const onSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        const form = event.currentTarget; // save ref before async
        const formData = new FormData(form);

        try {
            await fetch(WEB3FORMS_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
            });

            setSubmitResult('success');
            form.reset();
        } catch {
            setSubmitResult('error');
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const resetResult = useCallback(() => setSubmitResult('idle'), []);

    return { onSubmit, isSubmitting, submitResult, resetResult };
};
