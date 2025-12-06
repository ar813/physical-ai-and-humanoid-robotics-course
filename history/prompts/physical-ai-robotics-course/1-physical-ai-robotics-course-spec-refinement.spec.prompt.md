---
id: 1
title: Physical AI Robotics Course Spec Refinement
stage: spec
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: physical-ai-robotics-course
branch: 1-physical-ai-robotics-course
user: user
command: /sp.specify
labels: ["specification", "clarification"]
links:
  spec: specs/1-physical-ai-robotics-course/spec.md
  ticket: null
  adr: null
  pr: null
files:
- specs/1-physical-ai-robotics-course/spec.md
- specs/1-physical-ai-robotics-course/checklists/requirements.md
tests:
- null
---

## Prompt

# Table of Contents (Easy Language)

## Chapter 1: Introduction to Physical AI and Robots

## Chapter 2: Understanding Intelligent Machines

## Chapter 3: How Robots See and Sense the World

## Chapter 4: Getting Started with ROS 2 (Robot Software)

## Chapter 5: Making Robot Programs in ROS 2

## Chapter 6: Building a Digital Robot World (Gazebo & Unity)

## Chapter 7: How to Create Robot Models (URDF & SDF)

## Chapter 8: How Robots Move and Feel Physics

## Chapter 9: NVIDIA Isaac – Smart Brain for Robots

## Chapter 10: Robot Vision, Mapping, and Navigation

## Chapter 11: How Humanoid Robots Move

## Chapter 12: Teaching Robots to Walk and Balance

## Chapter 13: Teaching Robots to Hold Things and Talk to People

## Chapter 14: Vision-Language-Action (VLA) Made Simple

## Chapter 15: Talking Robots with GPT and Voice Commands

## Chapter 16: Easy Guide to Robot Hardware

## Chapter 17: Training in Simulation and Using Robots in Real Life

## Chapter 18: Final Project – Make Your Own Smart Humanoid Robot

---

# Chapter Details (Easy Language)

## Chapter 1: Introduction to Physical AI and Robots

In this chapter, students learn what a robot is, what Physical AI means, and why humanoid robots are important for the future.

## Chapter 2: Understanding Intelligent Machines

Students will learn how robots think, how they understand the world, and how they make decisions using sensors and software.

## Chapter 3: How Robots See and Sense the World

This chapter explains simple ideas about robot eyes (cameras), depth sensors, LiDAR, and IMUs. Students learn how robots collect information.

## Chapter 4: Getting Started with ROS 2 (Robot Software)

Students learn the basics of ROS 2 — the software that helps robots talk, move, and work. It explains nodes, topics, and services in simple words.

## Chapter 5: Making Robot Programs in ROS 2

Students learn how to write small robot programs using Python in ROS 2. They learn how to create packages, publish messages, and run robot code.

## Chapter 6: Building a Digital Robot World (Gazebo & Unity)

This chapter teaches students how to create a virtual world where robots can be tested safely. They learn about Gazebo and Unity simulation.

## Chapter 7: How to Create Robot Models (URDF & SDF)

Students learn how to describe a robot's body, joints, and parts using URDF and SDF files.

## Chapter 8: How Robots Move and Feel Physics

This chapter teaches how robots use physics — gravity, friction, and collisions — to understand and move in the real world.

## Chapter 9: NVIDIA Isaac – Smart Brain for Robots

Students learn about NVIDIA Isaac Sim, how robots can learn from photos and videos, and how Isaac helps robots move smarter.

## Chapter 10: Robot Vision, Mapping, and Navigation

In this chapter, students learn how robots create maps, understand where they are, and move safely using SLAM, navigation tools, and sensors.

## Chapter 11: How Humanoid Robots Move

Students learn how a humanoid robot's body works — joints, arms, legs — and how robots calculate their movement.

## Chapter 12: Teaching Robots to Walk and Balance

This chapter teaches how two-legged robots walk, balance, and stay stable while moving.

## Chapter 13: Teaching Robots to Hold Things and Talk to People

Students learn simple ideas about robot hands, grasping objects, and how robots communicate with humans.

## Chapter 14: Vision-Language-Action (VLA) Made Simple

A simple explanation of how robots can see something, understand words, and take action based on both.

## Chapter 15: Talking Robots with GPT and Voice Commands

Students learn how to use GPT models, voice commands, and multimodal AI to make robots talk and understand speech.

## Chapter 16: Easy Guide to Robot Hardware

Explains in simple words what computers, sensors, cameras, and robots are needed to run Physical AI.

## Chapter 17: Training in Simulation and Using Robots in Real Life

Students learn how to train robots in a virtual world and then move their learning to real robots.

## Chapter 18: Final Project – Make Your Own Smart Humanoid Robot

In the final chapter, students combine everything they learned to build a humanoid robot that can listen, plan, move, and complete a task.

## Response snapshot

The specification for the 'Physical AI and Humanoid Robotics Course' feature has been drafted and refined based on user input, addressing clarifications regarding programming prerequisites and practical learning integration.

## Outcome

- ✅ Impact: The feature specification for the Physical AI and Humanoid Robotics Course has been successfully created and refined.
- 🧪 Tests: No automated tests were run in this phase.
- 📁 Files: specs/1-physical-ai-robotics-course/spec.md, specs/1-physical-ai-robotics-course/checklists/requirements.md
- 🔁 Next prompts: The next step is to proceed with `/sp.clarify` or `/sp.plan` based on the user's decision.
- 🧠 Reflection: Successfully handled clarification questions and updated the spec accordingly.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-phr.sh` script failed, requiring a manual PHR creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Investigate and fix the `create-phr.sh` script for future use.
