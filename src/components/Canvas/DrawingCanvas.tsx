import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Stage, Layer, Line, Image as KonvaImage } from 'react-konva';
import useImage from "../../utils/useImage";
import Konva from 'konva';

interface DrawingCanvasProps {
    tool: string;
    image: string;
    contrastValue: number;
    lines: { points: number[], erased: boolean }[];
    setLines: React.Dispatch<React.SetStateAction<{ points: number[], erased: boolean }[]>>;
}

export interface DrawingCanvasRef {
    clearCanvas: () => void;
    stageRef: React.RefObject<any>;
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({ tool, image, contrastValue, lines, setLines }, ref) => {
    const isDrawing = useRef(false);
    const startPoint = useRef<{ x: number, y: number } | null>(null);
    const [img, isLoaded] = useImage(image);
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const stageRef = useRef<any>(null);
    const layerRef = useRef<any>(null);
    const imageRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        clearCanvas,
        stageRef
    }));

    useEffect(() => {
        if (isLoaded && img) {
            setImageDimensions({ width: img.width, height: img.height });
        }
    }, [isLoaded, img]);

    const handleMouseDown = (event: any) => {
        if (!isLoaded || !img || (tool !== 'segment' && tool !== 'eraser')) return;
        const stage = event.target.getStage();
        const point = stage?.getPointerPosition();
        if (!point || point.x < 0 || point.x > imageDimensions.width || point.y < 0 || point.y > imageDimensions.height) return;
        isDrawing.current = true;
        startPoint.current = point;
        if (tool === 'segment') {
            setLines([...lines, { points: [point.x, point.y], erased: false }]);
        }
    };

    const handleMouseMove = (event: any) => {
        if (!isDrawing.current || !startPoint.current) return;
        const stage = event.target.getStage();
        const point = stage?.getPointerPosition();
        if (!point || point.x < 0 || point.x > imageDimensions.width || point.y < 0 || point.y > imageDimensions.height) return;

        const newLines = [...lines];
        const lastLine = newLines[newLines.length - 1];
        if (tool === 'segment') {
            lastLine.points = [startPoint.current.x, startPoint.current.y, point.x, point.y];
        } else if (tool === 'eraser') {
            for (let i = 0; i < newLines.length; i++) {
                const line = newLines[i];
                for (let j = 0; j < line.points.length - 2; j += 2) {
                    if (
                        point.x >= Math.min(line.points[j], line.points[j + 2]) &&
                        point.x <= Math.max(line.points[j], line.points[j + 2]) &&
                        point.y >= Math.min(line.points[j + 1], line.points[j + 3]) &&
                        point.y <= Math.max(line.points[j + 1], line.points[j + 3])
                    ) {
                        line.erased = true;
                    }
                }
            }
        }
        newLines[newLines.length - 1] = lastLine;
        setLines(newLines);
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        startPoint.current = null;
    };

    const clearCanvas = () => {
        setLines([]);
    };

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.cache();
            imageRef.current.filters([Konva.Filters.Contrast]);
            imageRef.current.contrast(contrastValue);
            layerRef.current.batchDraw();
        }
    }, [contrastValue]);

    return (
        <div>
            <Stage
                ref={stageRef}
                width={imageDimensions.width}
                height={imageDimensions.height}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <Layer ref={layerRef}>
                    {isLoaded && img && (
                        <KonvaImage
                            ref={imageRef}
                            image={img}
                        />
                    )}
                    {lines.filter(line => !line.erased).map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="red"
                            strokeWidth={2}
                            lineCap="round"
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
});

export default DrawingCanvas;
