import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Image as KonvaImage, Layer, Line, Stage} from 'react-konva';
import useImage from "../../utils/useImage";
import Konva from 'konva';
import {Box, useTheme} from "@mui/material";

interface DrawingCanvasProps {
    tool: string | null;
    image: string;
    contrastValue: number;
}

export interface DrawingCanvasRef {
    clearCanvas: () => void;
    stageRef: React.RefObject<any>;
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({tool, image, contrastValue}, ref) => {
    const [lines, setLines] = useState<{ points: number[], erased: boolean }[]>([]);
    const isDrawing = useRef(false);
    const startPoint = useRef<{ x: number, y: number } | null>(null);
    const [img, isLoaded] = useImage(image);
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({width: 0, height: 0});
    const stageRef = useRef<any>(null);
    const layerRef = useRef<any>(null);
    const imageRef = useRef<any>(null);
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        clearCanvas,
        stageRef,
    }));

    useEffect(() => {
        if (isLoaded && img) {
            setImageDimensions({width: img.width, height: img.height});
        }
    }, [isLoaded, img]);

    const handleStart = (event: any) => {
        if (!isLoaded || !img || (tool !== 'segment' && tool !== 'eraser' && tool !== 'move')) return;
        const stage = event.target.getStage();
        const point = stage.getPointerPosition();
        if (!point || point.x < 0 || point.x > imageDimensions.width || point.y < 0 || point.y > imageDimensions.height) return;
        isDrawing.current = true;
        startPoint.current = point;
        if (tool === 'segment') {
            setLines([...lines, {points: [point.x, point.y], erased: false}]);
        }
    };

    const handleMove = (event: any) => {
        if (!isDrawing.current || !startPoint.current) return;
        const stage = event.target.getStage();
        const point = stage.getPointerPosition();
        if (!point || point.x < 0 || point.x > imageDimensions.width || point.y < 0 || point.y > imageDimensions.height) return;

        if (tool === 'move') {
            const dx = point.x - startPoint.current.x;
            const dy = point.y - startPoint.current.y;
            imageRef.current?.move({x: dx, y: dy});
            layerRef.current?.batchDraw();
            startPoint.current = point;
        } else {
            const newLines = [...lines];
            const lastLine = newLines[newLines.length - 1];
            if (lastLine) {
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
            }
            setLines(newLines);
        }
    };

    const handleEnd = () => {
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
            <Box sx={{
                color: theme.palette.getContrastText(theme.palette.primary.main),
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },
            }}>
                <Stage
                    ref={stageRef}
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}
                    draggable={tool === 'move'}
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
            </Box>
        </div>
    );
});

export default React.memo(DrawingCanvas);
