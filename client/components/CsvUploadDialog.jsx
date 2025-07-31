'use client';
import { useState, useEffect } from 'react';

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CsvUploadDialog({
    isOpen,
    onClose,
    onSuccess,
    getToken
}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [taskCount, setTaskCount] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);


    const parseCsvFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const lines = text.split('\n');
                const headers = lines[0].split(',').map(h => h.trim());

                const data = [];
                for (let i = 1; i < lines.length; i++) {
                    if (lines[i].trim()) {
                        const values = lines[i].split(',').map(v => v.trim());
                        const row = {};
                        headers.forEach((header, index) => {
                            row[header] = values[index] || '';
                        });
                        data.push(row);
                    }
                }
                resolve(data);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.csv')) {
            setErrorMessage('Please select a CSV file');
            return;
        }

        try {
            setSelectedFile(file);
            const parsedData = await parseCsvFile(file);
            setCsvData(parsedData);
            setTaskCount(parsedData.length);
            setCurrentStep(2);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error parsing CSV file');
        }
    };

    const handleUpload = async () => {
        setUploadStatus('uploading');

        try {
            const token = getToken();
            const response = await fetch(`${backend_url}/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fileName: `${Date.now()}_${selectedFile.name}`,
                    originalName: selectedFile.name,
                    fileSize: selectedFile.size,
                    csvData: csvData,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setUploadStatus('success');
                onSuccess();
                handleClose();
            } else {
                setErrorMessage(data.message || 'Upload failed');
                setUploadStatus('error');
            }
        } catch (error) {
            setErrorMessage('Network error. Please try again.');
            setUploadStatus('error');
        }
    };

    const handleClose = () => {
        onClose();
        setCurrentStep(1);
        setSelectedFile(null);
        setCsvData([]);
        setTaskCount(0);
        setUploadStatus('idle');
        setErrorMessage('');
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrorMessage('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-md shadow-lg w-full max-w-lg mx-auto max-h-[90vh] overflow-hidden">
                <div className="bg-[#d6a676] flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900">Upload Task</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 bg-white/90 transition-colors p-1 rounded-full hover:bg-gray-100"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>



                <div className="px-6 py-6">

                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileSelect}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-lg font-medium text-gray-900 mb-1">Choose CSV file</p>
                                                <p className="text-sm text-gray-500">Click to browse or drag and drop</p>
                                                <p className="text-xs text-gray-400 mt-1">expected fields are <span className="font-medium text-gray-900">firstName, phone, notes</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {errorMessage && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-red-800 text-sm">{errorMessage}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}


                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">File: <span className="font-medium text-gray-900">{selectedFile?.name}</span></p>
                                    <p className="text-2xl font-bold text-gray-900">{taskCount}</p>
                                    <p className="text-sm text-gray-600">tasks will be created</p>
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-red-800 text-sm">{errorMessage}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex space-x-3 pt-2">
                                <button
                                    onClick={handleBack}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleUpload}
                                    disabled={uploadStatus === 'uploading'}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {uploadStatus === 'uploading' ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Uploading...
                                        </>
                                    ) : (
                                        'Upload Tasks'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}