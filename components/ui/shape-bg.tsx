'use client';
import Image from 'next/image';

export const ShapeBG = () => {

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-2 md:py-6">
            <div className="text-center">
                <div className="fixed top-0 left-0 rotate-180 -translate-x-3/4 -scale-x-100 blur-3xl opacity-20 pointer-events-none" aria-hidden="true">
                    <Image src="/images/shape.svg" className="max-w-none" width={852} height={582} alt="Illustration" />
                </div>
                
                <div className="fixed top-0 right-0 -translate-y-1/2 translate-x-1/4 blur-3xl opacity-20 pointer-events-none" aria-hidden="true">
                    <Image src="/images/shape.svg" className="max-w-none" width={852} height={582} alt="Illustration" />
                </div>
            </div>
        </div>
    )
}