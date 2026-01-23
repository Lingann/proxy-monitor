import { reactive, ref } from 'vue';
import { FormRules } from '../../../components/common-form/types';

export function useDemoState() {
    const formData = reactive({
        username: '',
        email: '',
        role: ''
    });

    const rules: FormRules = {
        username: [
            { required: true, message: 'Username is required', trigger: 'blur' },
            { min: 3, message: 'Username must be at least 3 characters', trigger: 'blur' }
        ],
        email: [
            { required: true, message: 'Email is required', trigger: 'blur' },
            { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
        ],
        role: [
            { required: true, message: 'Role is required', trigger: 'change' }
        ]
    };
    
    const output = ref('');
    const formRef = ref<any>(null);

    return {
        formData,
        rules,
        output,
        formRef
    };
}
