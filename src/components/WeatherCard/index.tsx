import styled from '@emotion/styled';
import { ComponentConfig, RenderProps, Slot } from '@hakit/addon';

// Define individual styled components - these are completely isolated
const CardContainer = styled.div<{ backgroundColor?: string; isHighlighted?: boolean }>`
  background: ${props => props.backgroundColor || 'white'};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  ${props => props.isHighlighted && `
    border: 2px solid #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h1<{ titleColor?: string; size?: 'small' | 'medium' | 'large' }>`
  color: ${props => props.titleColor || '#333'};
  margin: 0 0 1rem 0;
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '1.2rem';
      case 'large': return '2.5rem';
      default: return '1.8rem';
    }
  }};
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 1rem 0;
  
  /* ✅ Safe: These styles only affect this specific container */
  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' ? `
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
  ` : `
    background: #f3f4f6;
    color: #374151;
    
    &:hover {
      background: #e5e7eb;
    }
  `}
`;

interface MyComponentProps {
  title?: string;
  backgroundColor?: string;
  titleColor?: string;
  titleSize?: 'small' | 'medium' | 'large';
  isHighlighted?: boolean;
  primaryAction?: string;
  secondaryAction?: string;
  content: Slot;
  _styleOverrides?: {
    style?: string;
  };
}

export function Render({content: Content, ...props}: RenderProps<MyComponentProps>) {
  return (
    <CardContainer 
      backgroundColor={props.backgroundColor}
      isHighlighted={props.isHighlighted}
    >
      <CardTitle 
        titleColor={props.titleColor}
        size={props.titleSize}
      >
        {props.title || 'Default Title'}
      </CardTitle>
      
      <CardContent>
        <p>This content area is completely isolated from parent/child components.</p>
        
        {/* Dropzone content will not inherit any styles */}
        <Content />
      </CardContent>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {props.primaryAction && (
          <ActionButton variant="primary">
            {props.primaryAction}
          </ActionButton>
        )}
        {props.secondaryAction && (
          <ActionButton variant="secondary">
            {props.secondaryAction}
          </ActionButton>
        )}
      </div>
    </CardContainer>
  );
}

export const config: ComponentConfig<MyComponentProps> = {
  label: 'Safe Styled Card',
  fields: {
    title: { type: 'text', label: 'Title', default: 'My Card' },
    backgroundColor: { type: 'text', label: 'Background Color', default: '#ffffff' },
    titleColor: { type: 'text', label: 'Title Color', default: '#333333' },
    titleSize: { 
      type: 'select', 
      label: 'Title Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' }
      ],
      default: 'medium'
    },
    _styleOverrides: {
          type: 'object',
          label: 'Style Overrides',
          description: 'Provide css updates to override the default styles of this component',
          objectFields: {
            style: {
              type: 'code',
              label: 'CSS Styles',
              description: 'Provide CSS styles to override the default styles of this component',
              default: '',
            },
          },
        },
    content: {
      type: 'slot',
    },
    isHighlighted: { type: 'switch', label: 'Highlighted', default: false },
    primaryAction: { type: 'text', label: 'Primary Action Text', default: '' },
    secondaryAction: { type: 'text', label: 'Secondary Action Text', default: '' }
  },
  render: Render,
};