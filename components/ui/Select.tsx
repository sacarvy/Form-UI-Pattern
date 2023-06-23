import React from 'react';

interface SelectProp extends React.HTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode
}

export default React.forwardRef<HTMLSelectElement, SelectProp>(function Select({children, ...props}, ref) {

    return (
        <>
            <select name="" id="" {...props} ref={ref} className='p-2 py-3 rounded-md'>
                {children}
            </select>
        </>
    )
});