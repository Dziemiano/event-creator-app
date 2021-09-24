import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, DateTimePicker } from 'react-rainbow-components';

type Props = {
    saveEvent: (formData: IEvent | any) => void
}

const AddEvent: React.FC<Props> = ({ saveEvent }) => {

    const date: string = new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString();

    const { register, handleSubmit, formState: {errors}, control } = useForm<IEvent>();
    const onSubmit: SubmitHandler<IEvent>  = data => saveEvent(data);
    
    const [firstNameClass, setFnClass] = useState("input-ok")
    const [lastNameClass, setLnClass] = useState("input-ok")
    const [emailClass, setEmailClass] = useState("input-ok")

    useEffect(() => { 
        errors.first_name ?
            setFnClass("input-error") : setFnClass("input-ok")
        
        errors.last_name ?
            setLnClass("input-error") : setLnClass("input-ok")
        
        errors.email ?
            setEmailClass("input-error") : setEmailClass("input-ok")    
    },[errors.first_name, errors.last_name, errors.email]);

    return (
        <form className="Form" id="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='firstName'>First Name</label>
                <input {...register('first_name', {required: true})} id='first_name' placeholder='Enter first name' className={firstNameClass}/>
                {errors.first_name && <div>Field required</div> }
            </div>
            <div>
                <label htmlFor='lastName'>Last Name</label>
                <input {...register('last_name', {required: true})} id='last_name' placeholder='Enter last name' className={lastNameClass}/>
                {errors.last_name && <div>Field required</div>}
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input {...register('email', { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ } )} id='email' placeholder='Enter email' className={emailClass}/>
                {errors.email?.type === 'pattern' && <div>Email can only contain letters, numbers and @</div>}
                {errors.email?.type === 'required' && <div>Field required</div>}
            </div>
            <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">   
                <Controller
                    name="date"
                    control={control}
                    defaultValue={date}
                    render={({field : {value = date, onChange}}) =>
                        <DateTimePicker
                            value={value}
                            label="Event Date"
                            onChange={(e) => onChange(e.toLocaleDateString() + ", " + e.toLocaleTimeString())}
                            className="rainbow-m-around_smallinp"
                        />
                    }
                />
            </div>
            <Button label= "Add Event" form="form" type="submit"/>
        </form>
    )
}

export default AddEvent