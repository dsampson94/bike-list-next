import React from 'react';

interface ButtonProps {
    label: string;
    onClick?: () => void;
}

/**
 * Button component renders a styled button with a label.
 *
 * @component
 * @param {Object} props - React props
 * @param {string} props.label - The label to be displayed on the button.
 * @param {Function} [props.onClick] - Optional click handler function for the button.
 * @returns {React.ReactElement} The rendered button component.
 */
const Button = ({ label, onClick }: ButtonProps): React.ReactElement => {
    return (
        <div className="p-[1px] bg-gray-500 rounded-xl shadow-sm">
            <div className="p-[1px] bg-gray-100 rounded-xl border-1 shadow-sm">
                <button
                    className="relative px-4 py-2 bg-gradient-to-b from-[#e4e4e4] to-[#b3b3b3] text-[#5b5b5b]
                    border-4 border-gray-300 rounded-xl font-bold shadow-sm"
                    onClick={onClick}
                >
                    {label}
                    <div className="absolute inset-0 rounded-lg border-[1px] shadow-lg border-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default Button;
