import React from 'react';
import { render, screen } from '@testing-library/react';
import ImportDialog from './ImportDialog';

describe('ImportDialog', () => {
    test('renders ImportDialog component correctly', () => {
        render(<ImportDialog open={true} onClose={() => {}} onDrop={() => {}} />);

        expect(screen.getByText('Import Photo')).toBeInTheDocument();
        expect(screen.getByText('Drag and drop a photo here, or click to select one')).toBeInTheDocument();
    });
});
