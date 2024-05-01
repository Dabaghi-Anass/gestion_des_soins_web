"use client";
import { Label } from "@/components/ui/label";
import { SelectProps } from "@radix-ui/react-select";
import React, { HTMLAttributes, useTransition } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import ReactLoading from "react-loading";
import { Button, ButtonProps } from "./ui/button";
import { Input, InputProps } from "./ui/input";
import { Select } from "./ui/select";
import { Textarea, TextareaProps } from "./ui/textarea";
type FormProps = HTMLAttributes<HTMLFormElement> & {
	onSubmit: (data: any) => void;
};
type FormInputProps = InputProps & {
	name: string;
	label?: string;
	error?: string;
};
type FormSelectProps = SelectProps & {
	name: string;
};

type FormTextAreaProps = TextareaProps & {
	name: string;
};
function Form({ children, onSubmit, ...props }: FormProps) {
	const methods = useForm();
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
				{children}
			</form>
		</FormProvider>
	);
}

function FormInput({ name, error, label, ...props }: FormInputProps) {
	const { register } = useFormContext();
	return <div>
		{label && <Label className="pb-4 block text-slate-400" htmlFor={name}>{label}</Label>}
		<Input {...register(name)} {...props} />
		{error && <FormErrorMessage>{error}</FormErrorMessage>}
	</div>;
}

function FormSelect({ name, children, ...props }: FormSelectProps) {
	const { register } = useFormContext();
	return (
		<Select {...register(name)} {...props}>
			{children}
		</Select>
	);
}

function FormTextArea({ name, ...props }: FormTextAreaProps) {
	const { register } = useFormContext();
	return <Textarea {...register(name)} {...props} />;
}

function FormButton({ children, onClick, ...props }: React.PropsWithChildren<ButtonProps>) {
	const [pending, startTransition] = useTransition();
	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		startTransition(async () => {
			await onClick?.(e);
		})
	}
	return (
		<Button type='submit' disabled={pending} {...props} onClick={handleClick}>
			{pending ? <ReactLoading type="spin" color="#fff" height={20} width={20} /> :
				children
			}
		</Button>
	);
}

function FormActions(props: React.PropsWithChildren<{}>) {
	return <div className='flex gap-4'>{props.children}</div>;
}

function FormErrorMessage(props: React.PropsWithChildren<{ className?: string }>) {
	return (
		<div className="text-red-900 bg-red-100 py-2 px-2 rounded text-sm flex items-center gap-2 w-full max-w-full">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${props.className}`}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
			</svg>
			<div className="break-words text-wrap max-w-[300px] truncate text-ellipsis">{props.children}</div>
		</div>
	);
}

Form.Input = FormInput;
Form.Select = FormSelect;
Form.TextArea = FormTextArea;
Form.Button = FormButton;
Form.Actions = FormActions;
Form.ErrorMessage = FormErrorMessage;

export default Form;
