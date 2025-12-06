# Physical AI & Humanoid Robotics Course - Claude Guidelines

This file contains guidelines and standards for working on the Physical AI & Humanoid Robotics course documentation site.

## Project Overview

**Project Name**: Physical AI & Humanoid Robotics Course  
**Platform**: Docusaurus 3.9.2  
**Tech Stack**: React 19, TypeScript, MDX  
**Purpose**: Comprehensive educational platform teaching robotics from basics to advanced AI integration

### Course Structure

The course contains **18 chapters** organized into **8 parts**:

- **Part I: Foundations** (Chapters 1-3) - Physical AI, Intelligent Machines, Robot Sensing
- **Part II: ROS 2 & Simulation** (Chapters 4-6) - ROS 2 Basics, Programming, Gazebo
- **Part III: Robot Modeling & Physics** (Chapters 7-8) - URDF/SDF Models, Physics
- **Part IV: Advanced Simulation** (Chapters 9-10) - NVIDIA Isaac, Vision, SLAM
- **Part V: Humanoid Robotics** (Chapters 11-13) - Movement, Walking, Balance, Manipulation
- **Part VI: AI Integration** (Chapters 14-15) - VLA Models, GPT Integration, Voice
- **Part VII: Hardware & Deployment** (Chapters 16-17) - Hardware, Sim-to-Real Transfer
- **Part VIII: Final Project** (Chapter 18) - Capstone Project

## Documentation Standards

### Chapter Structure

Every chapter should follow this consistent structure:

1. **Frontmatter** - Title, description, sidebar position
2. **Learning Objectives** - Clear, measurable outcomes
3. **Prerequisites** - What students should know
4. **Main Content** - Organized with clear headings
5. **Code Examples** - Well-commented, tested code
6. **Hands-On Practice** - Exercises and projects
7. **Troubleshooting** - Common issues and solutions
8. **Summary** - Key takeaways
9. **Review Questions** - Test comprehension
10. **Next Steps** - Link to next chapter

### Writing Style Guidelines

1. **Clarity First**: Write for beginners with no robotics background
2. **Progressive Complexity**: Build concepts incrementally
3. **Active Voice**: Use direct, action-oriented language
4. **Practical Examples**: Always connect theory to real applications
5. **Visual Learning**: Include diagrams, code blocks, and examples
6. **Encouraging Tone**: Motivate and support learners

### Technical Accuracy

#### Robotics Terminology
- Use standard robotics terminology consistently
- Define technical terms on first use
- Reference the Glossary for complex terms
- Follow ROS 2 naming conventions

#### Code Standards
- **Language**: Python for ROS 2 nodes
- **Style**: PEP 8 for Python, prettier for TypeScript/JSX
- **Comments**: Explain "why", not just "what"
- **Testing**: All code examples must be tested and functional
- **Version Compatibility**: Specify ROS 2 distribution (e.g., Humble, Iron)

## Content Development Guidelines

### Adding New Content

When creating or updating chapters:

1. **Research**: Verify accuracy with official documentation
   - ROS 2: https://docs.ros.org/
   - NVIDIA Isaac: https://docs.omniverse.nvidia.com/isaacsim/
   - Gazebo: https://gazebosim.org/docs

2. **Structure**: Follow the chapter template
3. **Code**: Test all code examples in the specified environment
4. **Review**: Check for clarity, accuracy, and completeness

### Updating Glossary

When adding terms to `docs/glossary.md`:

- Maintain alphabetical order within each letter section
- Use consistent formatting: `**Term**` followed by definition
- Keep definitions concise but complete (2-3 sentences max)
- Include examples where helpful
- Cross-reference related terms

### Markdown Formatting

```markdown
# Chapter Title (h1 - only once per page)

## Section Title (h2)

### Subsection (h3)

**Bold** for emphasis and terms
*Italic* for book titles or emphasis

- Bullet lists for features
1. Numbered lists for steps

> Use blockquotes for important notes

:::tip
Use admonitions for tips, warnings, notes
:::
```

## Code Examples Best Practices

### Python/ROS 2 Code

```python
#!/usr/bin/env python3
"""
Brief description of what this code does.
Author: [Your Name]
Date: [Date]
"""

import rclpy
from rclpy.node import Node

class ExampleNode(Node):
    """
    A simple ROS 2 node demonstrating [concept].
    """
    def __init__(self):
        super().__init__('example_node')
        self.get_logger().info('Node initialized')
    
    def run(self):
        """Main execution method."""
        pass

def main(args=None):
    rclpy.init(args=args)
    node = ExampleNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### URDF/SDF Examples

- Include complete, valid XML
- Add comments explaining each section
- Specify units in comments
- Link to official documentation

## Project-Specific Conventions

### File Organization

```
docs/
├── intro.md                    # Course welcome page
├── glossary.md                 # Technical terms dictionary
├── 01-introduction/
│   └── index.md               # Chapter content
├── 02-intelligent-machines/
│   └── index.md
...
└── 18-final-project/
    └── index.md
```

### Navigation

- Sidebar configuration: `sidebars.ts`
- Navbar configuration: `docusaurus.config.ts`
- All internal links use relative paths
- Chapter links format: `./01-introduction/` or `/docs/01-introduction`

### Images and Assets

- Store in `/static/img/`
- Use descriptive filenames: `robot-sensor-diagram.png`
- Optimize images (compress before adding)
- Include alt text for accessibility

## Accessibility Requirements

1. **Alt Text**: All images must have descriptive alt text
2. **Headings**: Use proper heading hierarchy (h1 → h2 → h3)
3. **Links**: Link text should be descriptive ("Learn more about ROS 2" not "click here")
4. **Code**: Include language identifiers in code blocks
5. **Color**: Don't rely solely on color to convey information

## SEO Best Practices

Each chapter should have:

```yaml
---
title: Clear, Descriptive Chapter Title
description: Compelling 120-160 character summary
keywords: [robotics, ROS 2, humanoid, AI]
---
```

## Quality Checklist

Before submitting documentation changes:

- [ ] Content is accurate and tested
- [ ] Code examples run without errors
- [ ] Spelling and grammar checked
- [ ] Links verified (no broken links)
- [ ] Images optimized and include alt text
- [ ] Follows chapter structure template
- [ ] Technical terms defined or in glossary
- [ ] Accessible to beginners
- [ ] Build succeeds (`npm run build`)
- [ ] Mobile-responsive layout verified

## Common Pitfalls to Avoid

1. **Assuming Knowledge**: Always explain concepts from first principles
2. **Incomplete Code**: Don't share partial or untested code snippets
3. **Outdated Information**: Verify all technical details are current
4. **Broken Links**: Check all internal and external links
5. **Missing Context**: Explain why something matters, not just how it works
6. **Inconsistent Terminology**: Use the same terms throughout
7. **Poor Accessibility**: Don't forget alt text, heading hierarchy, etc.

## Resources

### Official Documentation
- [Docusaurus](https://docusaurus.io/)
- [ROS 2 Documentation](https://docs.ros.org/)
- [MDX](https://mdxjs.com/)
- [React](https://react.dev/)

### Course-Specific
- Repository: https://github.com/panaversity/physical-ai-and-humanoid-robotics-course
- Community: https://discord.gg/panaversity
- Organization: https://panaversity.org

## Version History

- **v1.0** (Dec 2024) - Initial course launch with 18 chapters
- Course uses Docusaurus 3.9.2, React 19, Node.js 20+

---

**Remember**: Our goal is to make Physical AI and Humanoid Robotics accessible to everyone. Write with clarity, empathy, and enthusiasm for the amazing world of robotics! 🤖
