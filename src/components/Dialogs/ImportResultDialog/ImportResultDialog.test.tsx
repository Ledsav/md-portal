import React from 'react';
import { render, screen } from '@testing-library/react';
import ImportResultDialog from './ImportResultDialog';

describe('ImportResultDialog', () => {
    test('renders success message', () => {
        render(<ImportResultDialog open={true} onClose={() => {}} success={true} message={"importMessage"}/>);

        expect(screen.getByText('Import Successful')).toBeInTheDocument();
        expect(screen.getByText('The image was imported successfully.')).toBeInTheDocument();
    });
});
