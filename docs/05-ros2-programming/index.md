---
sidebar_position: 5
title: Chapter 5 - Making Robot Programs in ROS 2
description: Learn to write Python programs in ROS 2 with publishers, subscribers, and services
---

# Chapter 5: Making Robot Programs in ROS 2

Welcome to Chapter 5! Now that you understand ROS 2 basics, it's time to **write actual code**! In this chapter, you'll learn to create ROS 2 nodes in Python and make robots do things through programming.

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- Create ROS 2 packages
- Write publisher nodes to send data
- Write subscriber nodes to receive data
- Implement services for request-response communication
- Use parameters to configure nodes
- Create launch files to start multiple nodes
- Build a complete working robot program

## 📚 Chapter Overview

This chapter is divided into the following sections:

1. **ROS 2 Packages** - Organizing your code
2. **Your First Publisher** - Sending messages
3. **Your First Subscriber** - Receiving messages
4. **Publisher + Subscriber Together** - Communication
5. **Services** - Request-response programming
6. **Parameters** - Configuring nodes
7. **Launch Files** - Starting multiple nodes

## 📦 ROS 2 Packages

A **package** is a container for your ROS 2 code. It's like a folder with a special structure.

### Why Packages?

- **Organization**: Keep related code together
- **Sharing**: Easy to share with others
- **Dependencies**: Declare what your code needs
- **Building**: ROS 2 knows how to compile

### Package Structure

```
my_robot_package/
├── package.xml          # Package metadata
├── setup.py             # Python setup file
├── my_robot_package/    # Your Python code folder  
│   ├── __init__.py
│   ├── node1.py
│   └── node2.py
├── launch/              # Launch files (optional)
│   └── my_launch.py
├── config/              # Config files (optional)
└── resource/            # Resources (auto-generated)
```

### Creating a Package

```bash
# Navigate to workspace src folder
cd ~/ros2_ws/src

# Create package
ros2 pkg create --build-type ament_python my_robot_package

# This creates the package structure automatically!
```

**Breakdown:**
- `ros2 pkg create`: Command to create package
- `--build-type ament_python`: Using Python (not C++)
- `my_robot_package`: Your package name

:::tip Naming Convention
Use lowercase with underscores: `my_robot_package` ✅  
Avoid: `MyRobotPackage` ❌, `my-robot-package` ❌
:::

## 📤 Your First Publisher

A **publisher** sends messages to a topic. Let's create one!

### Simple Publisher Example

Create file: `my_robot_package/simple_publisher.py`

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SimplePublisher(Node):
    def __init__(self):
        # Initialize the node with a name
        super().__init__('simple_publisher')
        
        # Create publisher: publish String messages to topic 'hello'
        self.publisher_ = self.create_publisher(String, 'hello', 10)
        
        # Create timer: call timer_callback every 1 second
        timer_period = 1.0  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        
        self.counter = 0
        
    def timer_callback(self):
        # This function runs every second
        msg = String()
        msg.data = f'Hello World: {self.counter}'
        
        # Publish the message
        self.publisher_.publish(msg)
        
        # Log to console
        self.get_logger().info(f'Publishing: "{msg.data}"')
        
        self.counter += 1

def main(args=None):
    # Initialize ROS 2
    rclpy.init(args=args)
    
    # Create node
    node = SimplePublisher()
    
    # Keep node running
    rclpy.spin(node)
    
    # Cleanup
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Understanding the Code

**Line by line:**

```python
import rclpy                    # ROS 2 Python library
from rclpy.node import Node     # Node base class
from std_msgs.msg import String # String message type
```

```python
class SimplePublisher(Node):  # Inherit from Node
    def __init__(self):
        super().__init__('simple_publisher')  # Node name
```

```python
self.publisher_ = self.create_publisher(
    String,    # Message type
    'hello',   # Topic name
    10         # Queue size (how many messages to buffer)
)
```

```python
timer_period = 1.0  # Call every 1 second
self.timer = self.create_timer(timer_period, self.timer_callback)
```

```python
msg = String()              # Create message
msg.data = 'Hello World'    # Set data
self.publisher_.publish(msg) # Send it!
```

### Running the Publisher

```bash
# In terminal
cd ~/ros2_ws
colcon build --packages-select my_robot_package
source install/setup.bash

# Run the node
ros2 run my_robot_package simple_publisher
```

**Output:**
```
[INFO]: Publishing: "Hello World: 0"
[INFO]: Publishing: "Hello World: 1"
[INFO]: Publishing: "Hello World: 2"
...
```

## 📥 Your First Subscriber

A **subscriber** receives messages from a topic.

### Simple Subscriber Example

Create file: `my_robot_package/simple_subscriber.py`

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SimpleSubscriber(Node):
    def __init__(self):
        super().__init__('simple_subscriber')
        
        # Create subscriber: listen to 'hello' topic
        self.subscription = self.create_subscription(
            String,                  # Message type
            'hello',                 # Topic name  
            self.listener_callback,  # Callback function
            10                       # Queue size
        )
        
    def listener_callback(self, msg):
        # This function runs when message received
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    node = SimpleSubscriber()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Running Publisher + Subscriber

**Terminal 1:**
```bash
ros2 run my_robot_package simple_publisher
```

**Terminal 2:**
```bash
ros2 run my_robot_package simple_subscriber
```

**Results:**
- **Publisher output**: `[INFO]: Publishing: "Hello World: 0"`
- **Subscriber output**: `[INFO]: I heard: "Hello World: 0"`

They're communicating! 🎉

## 🤝 Practical Example: Robot Velocity Controller

Let's build something useful - a node that controls robot movement!

### Velocity Publisher

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class VelocityPublisher(Node):
    def __init__(self):
        super().__init__('velocity_publisher')
        
        # Publisher for robot movement
        self.publisher = self.create_publisher(Twist, 'cmd_vel', 10)
        
        # Publish commands at 10 Hz
        self.timer = self.create_timer(0.1, self.publish_velocity)
        
    def publish_velocity(self):
        msg = Twist()
        
        # Move forward at 0.5 m/s
        msg.linear.x = 0.5
        
        # No rotation
        msg.angular.z = 0.0
        
        self.publisher.publish(msg)
        self.get_logger().info('Moving forward!')

def main(args=None):
    rclpy.init(args=args)
    node = VelocityPublisher()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()
```

**What's `Twist`?**
- `linear.x`: Forward/backward speed (m/s)
- `linear.y`: Left/right speed (usually 0 for wheeled robots)
- `linear.z`: Up/down speed (usually 0 for ground robots)
- `angular.z`: Rotation speed (rad/s)

### Movement Patterns

```python
# Move forward
msg.linear.x = 0.5
msg.angular.z = 0.0

# Turn right
msg.linear.x = 0.0
msg.angular.z = -0.5  # Negative = right

# Circle (forward + turning)
msg.linear.x = 0.3
msg.angular.z = 0.5

# Stop
msg.linear.x = 0.0
msg.angular.z = 0.0
```

## 🔧 Services in Code

Services allow request-response communication. Let's create a simple calculator service!

### Service Server (Provider)

```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts  # Service type

class CalculatorService(Node):
    def __init__(self):
        super().__init__('calculator_service')
        
        # Create service
        self.srv = self.create_service(
            AddTwoInts,           # Service type
            'add_two_ints',       # Service name
            self.add_callback     # Callback function
        )
        
    def add_callback(self, request, response):
        # request contains: a, b (two integers)
        # response will contain: sum
        
        response.sum = request.a + request.b
        
        self.get_logger().info(
            f'{request.a} + {request.b} = {response.sum}'
        )
        
        return response

def main(args=None):
    rclpy.init(args=args)
    node = CalculatorService()
    self.get_logger().info('Calculator service ready!')
    rclpy.spin(node)
```

### Service Client (User)

```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class CalculatorClient(Node):
    def __init__(self):
        super().__init__('calculator_client')
        
        # Create client
        self.client = self.create_client(AddTwoInts, 'add_two_ints')
        
        # Wait for service to be available
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Waiting for service...')
    
    def send_request(self, a, b):
        # Create request
        request = AddTwoInts.Request()
        request.a = a
        request.b = b
        
        # Send request and wait for response
        future = self.client.call_async(request)
        rclpy.spin_until_future_complete(self, future)
        
        if future.result() is not None:
            result = future.result().sum
            self.get_logger().info(f'Result: {result}')
            return result
        else:
            self.get_logger().error('Service call failed!')
            return None

def main(args=None):
    rclpy.init(args=args)
    node = CalculatorClient()
    
    # Call service
    result = node.send_request(5, 7)
    print(f'5 + 7 = {result}')
    
    node.destroy_node()
    rclpy.shutdown()
```

## ⚙️ Parameters - Configuring Nodes

**Parameters** let you configure nodes without changing code!

### Using Parameters

```python
import rclpy
from rclpy.node import Node

class ConfigurableNode(Node):
    def __init__(self):
        super().__init__('configurable_node')
        
        # Declare parameters with default values
        self.declare_parameter('robot_name', 'MyRobot')
        self.declare_parameter('max_speed', 1.0)
        self.declare_parameter('enable_logging', True)
        
        # Get parameter values
        robot_name = self.get_parameter('robot_name').value
        max_speed = self.get_parameter('max_speed').value
        logging_enabled = self.get_parameter('enable_logging').value
        
        self.get_logger().info(f'Robot name: {robot_name}')
        self.get_logger().info(f'Max speed: {max_speed}')
        self.get_logger().info(f'Logging: {logging_enabled}')
```

### Setting Parameters from Command Line

```bash
# Run with custom parameters
ros2 run my_package configurable_node --ros-args \
  -p robot_name:=SuperBot \
  -p max_speed:=2.5 \
  -p enable_logging:=false
```

### Changing Parameters at Runtime

```bash
# View parameters
ros2 param list

# Get parameter value
ros2 param get /configurable_node robot_name

# Set parameter value
ros2 param set /configurable_node max_speed 3.0
```

## 🚀 Launch Files - Starting Multiple Nodes

**Launch files** start multiple nodes with one command!

### Simple Launch File

Create: `launch/my_robot_launch.py`

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        # Start publisher node
        Node(
            package='my_robot_package',
            executable='simple_publisher',
            name='publisher_node'
        ),
        
        # Start subscriber node
        Node(
            package='my_robot_package',
            executable='simple_subscriber',
            name='subscriber_node'
        ),
    ])
```

### Running Launch File

```bash
ros2 launch my_robot_package my_robot_launch.py
```

Both nodes start with one command! 🎉

### Launch File with Parameters

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_robot_package',
            executable='configurable_node',
            name='robot_1',
            parameters=[{
                'robot_name': 'Robot1',
                'max_speed': 1.5
            }]
        ),
        
        Node(
            package='my_robot_package',
            executable='configurable_node',
            name='robot_2',
            parameters=[{
                'robot_name': 'Robot2',
                'max_speed': 2.0
            }]
        ),
    ])
```

## 📝 Chapter Summary

Let's review what we learned:

### Key Points

✅ **Packages** organize ROS 2 code with a standard structure  
✅ **Publishers** send messages to topics using `create_publisher()`  
✅ **Subscribers** receive messages from topics using `create_subscription()`  
✅ **Services** enable request-response with server/client pattern  
✅ **Parameters** configure nodes without changing code  
✅ **Launch files** start multiple nodes with one command  
✅ **Python + ROS 2** makes robot programming accessible  

### Important Terms

- **Package**: Container for organizing ROS 2 code
- **Publisher**: Node that sends messages to a topic
- **Subscriber**: Node that receives messages from atopic
- **Callback**: Function that runs when event occurs
- **Timer**: Triggers callback at regular intervals
- **Parameter**: Configurable value for a node
- **Launch File**: Script to start multiple nodes

## 🎯 Practice Exercises

Test your understanding with these exercises:

### Exercise 1: Modify the Publisher
Modify `simple_publisher.py` to:
- Publish at 2 Hz instead of 1 Hz
- Include the current time in the message

### Exercise 2: Create a Counter Subscriber
Create a subscriber that:
- Listens to the hello topic
- Counts how many messages received
- Prints the count every 10 messages

### Exercise 3: Build a Square Mover
Create a publisher that makes a robot move in a square:
- Move forward for 2 seconds
- Turn 90° for 1 second
- Repeat 4 times

## ❓ Review Questions

1. What command creates a new ROS 2 package?
2. What's the difference between a publisher and a subscriber?
3. How do you create a timer that runs every 0.5 seconds?
4. When would you use a service instead of a topic?
5. What's the purpose of parameters in ROS 2?
6. How do you start multiple nodes at once?

## 🔍 Common Mistakes

### Mistake 1: Forgetting to build after changes
**Reality**: After editing code, always run `colcon build`!

### Mistake 2: Not sourcing the workspace
**Reality**: Run `source install/setup.bash` in each new terminal!

### Mistake 3: Large queue sizes
**Reality**: Queue size of 10 is usually enough. Don't use 1000!

## 🛠️ Troubleshooting

**Q: My node doesn't appear in `ros2 node list`**  
A: Make sure the node is running and you've called `rclpy.spin()`

**Q: "No module named 'my_robot_package'"**  
A: Did you build the package and source the workspace?

**Q: Subscriber not receiving messages**  
A: Check topic names match exactly (including slashes and case)!

## 🚀 Next Steps

Excellent work! You can now write real ROS 2 programs in Python!

In the next chapter, we'll explore **simulation** - testing your robots in virtual worlds before building them for real!

👉 **[Continue to Chapter 6: Building a Digital Robot World](../06-simulation/index.md)**

---

## 📚 Additional Resources

- [ROS 2 Python API Documentation](https://docs.ros2.org/latest/api/rclpy/)
- [Common ROS 2 Message Types](https://docs.ros2.org/latest/api/common_interfaces/)
- [ROS 2 Python Examples](https://github.com/ros2/examples)

## 💬 Discussion Questions

1. What robot behavior would you like to program first?
2. Why is it helpful to separate publishers and subscribers?
3. Can you think of a real robot that would benefit from parameters?

---

**Chapter 5 Complete!** ✅  
**Next**: Chapter 6 - Building a Digital Robot World
