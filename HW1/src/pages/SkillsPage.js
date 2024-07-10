import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SkillsPage({ onSaveSkills }) {
  const [skill1, setSkill1] = useState('');
  const [skill2, setSkill2] = useState('');
  const navigate = useNavigate();

  const handleSaveSkills = (e) => {
    e.preventDefault();
    onSaveSkills({ skill1, skill2 });
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSaveSkills}>
        <h2 className="text-2xl mb-4">Add Your Skills</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Skill 1</label>
          <input
            type="text"
            value={skill1}
            onChange={(e) => setSkill1(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Skill 2</label>
          <input
            type="text"
            value={skill2}
            onChange={(e) => setSkill2(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Skills</button>
      </form>
    </div>
  );
}

export default SkillsPage;
