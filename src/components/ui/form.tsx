import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

type BaseInputProps = {
  label: string;
  containerClass?: string;
  error?: string;
};

type InputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, containerClass = '', error, ...props }: InputProps) {
  return (
    <div className={containerClass}>
      <label htmlFor={props.id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`w-full h-11 rounded-md border border-black/20 bg-white px-3 outline-none focus:ring-2 focus:ring-black/20 ${props.className || ''}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

type SelectProps = BaseInputProps & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ label, containerClass = '', error, children, ...props }: SelectProps) {
  return (
    <div className={containerClass}>
      <label htmlFor={props.id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          className={`w-full h-11 rounded-md border border-black/20 bg-white px-3 pr-8 outline-none focus:ring-2 focus:ring-black/20 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] ${props.className || ''}`}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")'
          }}
        >
          {children}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
