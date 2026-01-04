import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUserFilled, IconUser, IconEye, IconEyeOff } from '@tabler/icons-react';
import Style from '../../Styles/Website/Login.module.css';

const loginSchema = z.object({
    usuario: z.string().min(1, "El usuario es obligatorio"),
    clave: z.string().min(6, "La clave debe tener al menos 6 caracteres"),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data) => {
        console.log("Datos válidos:", data);
        // Aquí harías tu llamada a la API
    };

    return (
        <main className={Style.loginMain}>
            <form className={Style.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <IconUser stroke={1} className={Style.icon}/>
                <h1 className={Style.h1}>Bienvenido</h1>
                
                <fieldset className={Style.fieldsetInput}>
                    <label htmlFor="usuario" className={Style.label}>Usuario</label>
                    <input 
                        type="text" 
                        id="usuario" 
                        className={Style.input} 
                        {...register("usuario")}
                    />
                    <IconUserFilled className={Style.userIcon}/>
                    
                    {errors.usuario && (
                        <span className={Style.error}>
                            {errors.usuario.message}
                        </span>
                    )}
                </fieldset>

                <fieldset className={Style.fieldsetInput} style={{ marginTop: errors.usuario ? '25px' : '0' }}>
                    <label htmlFor="clave" className={Style.label}>Clave</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        id="clave" 
                        className={Style.input}
                        {...register("clave")}
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} 
                        className={Style.buttonClave}
                    >
                        {showPassword ? <IconEyeOff stroke={2}/> : <IconEye stroke={2}/>}
                    </button>
                    {errors.clave && (
                        <span className={Style.error}>
                            {errors.clave.message}
                        </span>
                    )}
                </fieldset>

                <fieldset className={Style.fieldsetButton}>
                    <button type="submit" className={Style.button}>Iniciar Sesion</button>
                </fieldset>
            </form>
        </main>
    );
};

export default Login;