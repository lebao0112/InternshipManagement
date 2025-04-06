import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";

export default function CreateCVPage() {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        hardSkills: '',
        softSkills: '',
        certificates: '',
        objective: '',
        experience: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prompt = `
            Bạn là một nhà tuyển dụng lâu năm, hãy tạo một CV cho ứng viên đụa trên các thông tin sau:
            Tên: ${formData.name}
            Vị trí ứng tuyển: ${formData.position}
            Kỹ năng cứng: ${formData.hardSkills}
            Kỹ năng mềm: ${formData.softSkills}
            Chứng chỉ: ${formData.certificates}
            Mục tiêu nghề nghiệp: ${formData.objective}
            Kinh nghiệm làm việc: ${formData.experience}
        `;

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo-1106",
                messages: [
                    { "role": "system", "content": "You are a helpful assistant." },
                    { "role": "user", "content": prompt }
                ]
            }, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                }
            });

            const content = response.data.choices[0].message.content;
            generatePDF(content);
        } catch (error) {
            console.error('Failed to generate CV', error);
        }
    };

    const generatePDF = (content) => {
        const doc = new jsPDF();
        doc.text(content, 10, 10);
        doc.save('generated_CV.pdf');
    };

    return (
        <div className="max-w-4xl mx-auto shadow-lg rounded-lg mt-5">
            <h1 className="text-2xl font-bold text-center mb-6">Tạo CV cùng AI</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <textarea className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                <textarea className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position Applying For" required />
                <textarea className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="hardSkills" value={formData.hardSkills} onChange={handleChange} placeholder="Hard Skills" required />
                <textarea className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="softSkills" value={formData.softSkills} onChange={handleChange} placeholder="Soft Skills" required />
                <textarea className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" name="certificates" value={formData.certificates} onChange={handleChange} placeholder="Certificates" required />
                <textarea className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" name="objective" value={formData.objective} onChange={handleChange} placeholder="Career Objective" required />
                <textarea className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" name="experience" value={formData.experience} onChange={handleChange} placeholder="Work Experience" required />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-150">Create CV</button>
            </form>
        </div>
    );
}
