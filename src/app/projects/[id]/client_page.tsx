'use client';
import React from 'react';

interface ProjectProps {
  id: string;
}

export const Project: React.FC<ProjectProps> = ({ id }) => {
  return (
    <div>
      <h1>{id}</h1>
      <h1>Project Title</h1>
      <h1>Project description</h1>
    </div>
  );
};

export const getStaticProps = async () => {};
