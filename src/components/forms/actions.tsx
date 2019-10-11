import Nprogress from 'nprogress';
import { toast } from 'react-toastify';

interface OnFormSuccessProps {
    resetForm: () => void;
    resetStore?: () => void;
    setSubmitting: (boolean) => void;
}

interface OnFormFailProps {
    resetForm: () => void;
    setSubmitting: (boolean) => void;
    errorMessage?: string;
}

const onFormSuccess = ({
    resetStore,
    resetForm,
    setSubmitting
}: OnFormSuccessProps): void => {
    Nprogress.done();
    if (resetStore) resetStore();
    resetForm();
    setSubmitting(false);
    toast.success('✅ Success!');
};

const onFormFail = ({ resetForm, setSubmitting }: OnFormFailProps): void => {
    Nprogress.done();
    setSubmitting(false);
    resetForm();
};

export { onFormSuccess, onFormFail };
