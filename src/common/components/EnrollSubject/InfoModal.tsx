import { useState, useEffect } from 'react';

function InfoModal() {
    const [showInfo, setShowInfo] = useState(true);

    useEffect(() => {
        if (showInfo) {
            // Disable scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scrolling
            document.body.style.overflow = 'auto';
        }

        // Clean up when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showInfo]);

    return (
        <>
            {showInfo && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                        <h2 className="text-lg font-bold mb-4">Information about this page</h2>
                        <p className="mb-4">This is a page that displays the curriculum and enrolled courses for a student.</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowInfo(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default InfoModal;
