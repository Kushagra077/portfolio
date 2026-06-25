'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import { DiagramKey } from '@/lib/data';

const W = 158;
const H = 56;

interface NodeDef {
  label: string;
  x: number;
  y: number;
  active?: boolean;
}

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
};

function Node({ label, x, y, active }: NodeDef) {
  return (
    <motion.g variants={nodeVariants} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
      <rect
        x={x}
        y={y}
        width={W}
        height={H}
        rx={8}
        fill="hsl(var(--card))"
        stroke={active ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
        strokeWidth={active ? 2 : 1}
      />
      <text
        x={x + W / 2}
        y={y + H / 2 + 4}
        textAnchor="middle"
        className="font-mono"
        fontSize={12}
        fill="hsl(var(--foreground))"
      >
        {label}
      </text>
    </motion.g>
  );
}

function Arrow({
  from,
  to,
  y,
  cobalt,
}: {
  from: number;
  to: number;
  y: number;
  cobalt?: boolean;
}) {
  const stroke = cobalt ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))';
  return (
    <motion.line
      x1={from}
      y1={y}
      x2={to}
      y2={y}
      stroke={stroke}
      strokeWidth={1.25}
      markerEnd={cobalt ? 'url(#arrow-cobalt)' : 'url(#arrow-grey)'}
      variants={lineVariants}
      opacity={0.7}
    />
  );
}

function Defs() {
  return (
    <defs>
      <marker id="arrow-grey" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
        <polygon points="0 0, 9 3.5, 0 7" fill="hsl(var(--muted-foreground))" />
      </marker>
      <marker id="arrow-cobalt" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
        <polygon points="0 0, 9 3.5, 0 7" fill="hsl(var(--primary))" />
      </marker>
    </defs>
  );
}

function rowX(i: number) {
  return 12 + i * 180; // node left edges: 12,192,372,552,732
}

function SmartIngest({ reduce }: { reduce: boolean }) {
  const rowMid = 120;
  const labels = ['Guardrails', 'Classify', 'Extract', 'Validate', 'Route'];
  const activeIdx = 2;
  const extractCx = rowX(2) + W / 2; // 451
  const validateCx = rowX(3) + W / 2; // 631
  return (
    <motion.svg
      viewBox="0 0 902 176"
      className="h-auto w-full"
      role="img"
      aria-label="SmartIngest pipeline: Guardrails, Classify, Extract, Validate, Route, with a retry loop from Validate back to Extract"
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <Defs />
      {/* connectors */}
      {[0, 1, 2, 3].map((i) => (
        <Arrow key={i} from={rowX(i) + W} to={rowX(i + 1)} y={rowMid} />
      ))}
      {/* retry loop */}
      <motion.path
        d={`M ${validateCx} ${rowMid - H / 2} C ${validateCx} 44, ${extractCx} 44, ${extractCx} ${rowMid - H / 2}`}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={1.25}
        strokeDasharray="5 4"
        markerEnd="url(#arrow-cobalt)"
        variants={lineVariants}
        className={reduce ? undefined : 'animate-dash'}
      />
      <text
        x={(extractCx + validateCx) / 2}
        y={36}
        textAnchor="middle"
        className="font-mono"
        fontSize={11}
        fill="hsl(var(--primary))"
      >
        retry on low confidence
      </text>
      {labels.map((label, i) => (
        <Node key={label} label={label} x={rowX(i)} y={rowMid - H / 2} active={i === activeIdx} />
      ))}
    </motion.svg>
  );
}

function RecruitRadar({ reduce }: { reduce: boolean }) {
  const rowMid = 56;
  const labels = ['JD Analyst', 'Resume Scorer', 'Interview Designer', 'Outreach Drafter', 'Tracker'];
  const activeIdx = 1;
  const scorerCx = rowX(1) + W / 2; // 271
  return (
    <motion.svg
      viewBox="0 0 902 240"
      className="h-auto w-full"
      role="img"
      aria-label="RecruitRadar crew: JD Analyst, Resume Scorer, Interview Designer, Outreach Drafter, Tracker, with an Evidence guard branch under Resume Scorer"
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      <Defs />
      {[0, 1, 2, 3].map((i) => (
        <Arrow key={i} from={rowX(i) + W} to={rowX(i + 1)} y={rowMid} />
      ))}
      {/* branch to evidence guard */}
      <motion.line
        x1={scorerCx}
        y1={rowMid + H / 2}
        x2={scorerCx}
        y2={150}
        stroke="hsl(var(--primary))"
        strokeWidth={1.25}
        markerEnd="url(#arrow-cobalt)"
        variants={lineVariants}
      />
      {labels.map((label, i) => (
        <Node key={label} label={label} x={rowX(i)} y={rowMid - H / 2} active={i === activeIdx} />
      ))}
      <Node label="Evidence guard" x={rowX(1)} y={150} />
      <text
        x={scorerCx}
        y={150 + H + 18}
        textAnchor="middle"
        className="font-mono"
        fontSize={10}
        fill="hsl(var(--muted-foreground))"
      >
        rapidfuzz · every claim cites the resume
      </text>
    </motion.svg>
  );
}

export function SystemDiagram({ diagram }: { diagram: DiagramKey }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="w-full">
      {diagram === 'smartingest' ? (
        <SmartIngest reduce={reduce} />
      ) : (
        <RecruitRadar reduce={reduce} />
      )}
    </div>
  );
}
