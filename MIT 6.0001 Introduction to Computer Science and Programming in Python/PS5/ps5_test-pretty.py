#!/usr/bin/env python3
"""
Enhanced Beautiful Test Runner for MIT PS5
Shows detailed error information while keeping it pretty
Now with optional debug output!
"""

import unittest
import sys
import time
import argparse
from datetime import datetime
import traceback
import re
# Import and run tests
from ps5_test import ProblemSet5NewsStory, ProblemSet5
from io import StringIO


class EnhancedBeautifulTestRunner:
    """A beautiful test runner with detailed error reporting"""
    
    def __init__(self, show_debug=False, show_test_details=True):
        self.start_time = None
        self.show_debug = show_debug
        self.show_test_details = show_test_details
        self.problems = {
            1: {"name": "NewsStory Class", "complete": False},
            2: {"name": "PhraseTrigger Abstract Class", "complete": False},
            3: {"name": "TitleTrigger Class", "complete": False},
            4: {"name": "DescriptionTrigger Class", "complete": False},
            5: {"name": "TimeTrigger Abstract Class", "complete": False},
            6: {"name": "Before/AfterTrigger Classes", "complete": False},
            7: {"name": "NotTrigger Class", "complete": False},
            8: {"name": "AndTrigger Class", "complete": False},
            9: {"name": "OrTrigger Class", "complete": False},
            10: {"name": "Filter Stories Function", "complete": False},
            11: {"name": "Read Trigger Config", "complete": False},
        }
        self.failed_tests = []
        self.error_tests = []
    
    def print_header(self):
        print("\n" + "🎓" + "=" * 76 + "🎓")
        print("🎯 MIT 6.0001 Problem Set 5: RSS Feed Filter Test Suite 🎯")
        print("🎓" + "=" * 76 + "🎓")
        print(f"📅 Test Run: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Show current settings
        debug_status = "ON" if self.show_debug else "OFF"
        details_status = "ON" if self.show_test_details else "OFF"
        print(f"🔧 Debug Output: {debug_status} | Test Details: {details_status}")
        
        print("🌟 Let's see how you're doing! 🌟\n")
    

    def print_beautiful_results(self, stats):
        print("\n" + "🎉" + "=" * 76 + "🎉")
        print("📊 TEST RESULTS SUMMARY")
        print("🎉" + "=" * 76 + "🎉")
        
        # Stats box
        print("┌" + "─" * 50 + "┐")
        print(f"│  📈 Total Tests: {stats['total']:>31} │")
        print(f"│  ✅ Passed:     {stats['passed']:>31} │")
        print(f"│  ❌ Failed:     {stats['failed']:>31} │")
        print(f"│  💥 Errors:     {stats['errors']:>31} │")
        print("└" + "─" * 50 + "┘")
        
        # Beautiful progress bar
        success_rate = stats['success_rate']
        bar_length = 50
        filled = int(bar_length * success_rate / 100)
        
        # Different colors based on progress
        if success_rate >= 80:
            bar_char = "🟩"
            empty_char = "⬜"
            emoji = "🎉"
        elif success_rate >= 60:
            bar_char = "🟨"
            empty_char = "⬜"
            emoji = "🚀"
        elif success_rate >= 40:
            bar_char = "🟧"
            empty_char = "⬜"
            emoji = "💪"
        else:
            bar_char = "🟥"
            empty_char = "⬜"
            emoji = "🔥"
        
        progress_bar = bar_char * filled + empty_char * (bar_length - filled)
        print(f"\n{emoji} Progress: {success_rate:.1f}%")
        print(f"[{progress_bar}]")
        
        # Motivational message
        if success_rate == 100:
            print("\n🎊 PERFECT SCORE! You're a coding wizard! 🧙‍♂️✨")
        elif success_rate >= 80:
            print("\n🌟 Excellent work! You're almost there! 🌟")
        elif success_rate >= 60:
            print("\n💪 Good progress! Keep pushing forward! 💪")
        elif success_rate >= 40:
            print("\n🔥 Getting started! Every expert was once a beginner! 🔥")
        else:
            print("\n🚀 Just getting started! The journey of 1000 miles begins with one step! 🚀")
    

        
    

    
    def run_tests(self):
        self.start_time = time.time()
        self.print_header()
        
        print("🧪 RUNNING TESTS...")
        print("─" * 30)
        
        try:
            # CAPTURE ALL OUTPUT (stdout + stderr)
            original_stdout = sys.stdout
            original_stderr = sys.stderr
            captured_stdout = StringIO()
            captured_stderr = StringIO()
            
            try:
                # Import and run tests
                from ps5_test import ProblemSet5NewsStory, ProblemSet5
                
                suite = unittest.TestSuite()
                suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ProblemSet5NewsStory))
                suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ProblemSet5))
                
                # Redirect stdout/stderr to capture debug prints
                sys.stdout = captured_stdout
                sys.stderr = captured_stderr
                
                # Create a custom result to capture detailed info
                stream = StringIO()
                runner = unittest.TextTestRunner(stream=stream, verbosity=2)
                result = runner.run(suite)
                
            finally:
                # Always restore stdout/stderr
                sys.stdout = original_stdout
                sys.stderr = original_stderr
            
            # Get all captured output
            debug_output = captured_stdout.getvalue()
            error_output = captured_stderr.getvalue()
            test_output = stream.getvalue()
            
            # Store debug output for error analysis
            self.debug_output = debug_output.split('\n')
            
            # Parse results for detailed error info
            self.parse_test_results(result)
            
            # Create stats
            stats = {
                'passed': result.testsRun - len(result.errors) - len(result.failures),
                'errors': len(result.errors),
                'failed': len(result.failures), 
                'total': result.testsRun,
                'success_rate': 0
            }
            
            if stats['total'] > 0:
                stats['success_rate'] = (stats['passed'] / stats['total']) * 100
            
            # Check if NewsStory tests passed (count passed NewsStory tests)
            newsStory_passed = 0
            for line in test_output.split('\n'):
                if 'testNewsStory' in line and ' ... ok' in line:
                    newsStory_passed += 1
            
            if newsStory_passed >= 6:  # All NewsStory tests
                self.problems[1]["complete"] = True

            # CONDITIONAL DEBUG OUTPUT
            if self.show_debug and debug_output.strip():
                print("🔍 DEBUG OUTPUT FROM TESTS:")
                print("─" * 30)
                for line in debug_output.split('\n'):
                    if line.strip():
                        print(f"{line}")
                print()  # Add spacing after debug output

            # Always show errors (they're important!)
            if error_output.strip():
                print("⚠️  ERROR OUTPUT:")
                print("─" * 20)
                for line in error_output.split('\n'):
                    if line.strip():
                        print(f"  ❌ {line}")
                print()

            # CONDITIONAL TEST DETAILS
            if self.show_test_details:
                print("📋 Test Details:")
                print("─" * 20)
                
                passed_count = 0
                for line in test_output.split('\n'):
                    if '...' in line:
                        if ' ... ok' in line:
                            line = line.replace(' ... ok', ' ✅')
                            passed_count += 1
                            print(f"  {line.strip()}")
                        elif ' ... ERROR' in line:
                            line = line.replace(' ... ERROR', ' ❌ ERROR')
                            print(f"  {line.strip()}")
                        elif ' ... FAIL' in line:
                            line = line.replace(' ... FAIL', ' ❌ FAILED')
                            print(f"  {line.strip()}")
                print()
            else:
                # Just show a quick summary if details are off
                print(f"✅ {stats['passed']} passed, ❌ {stats['failed']} failed, 💥 {stats['errors']} errors")
            
            # Print results summary
            self.print_beautiful_results(stats)
            
            # Final message with usage tip
            elapsed = time.time() - self.start_time
            print(f"\n⚡ Tests completed in {elapsed:.2f} seconds")
            
            # Show usage tip if not in debug mode
            if not self.show_debug:
                print("💡 Run with --debug to see detailed debug output")
            
            print("🎓" + "=" * 76 + "🎓")
            
            return result.wasSuccessful()
            
        except ImportError as e:
            print(f"❌ Could not import tests: {e}")
            print("💡 Make sure ps5.py and ps5_test.py are in the same directory!")
            return False
        except Exception as e:
            print(f"💥 Error running tests: {e}")
            traceback.print_exc()
            return False
    

    def parse_test_results(self, result):
        """Parse unittest results to extract detailed error information"""
        # Parse errors
        for test, traceback_str in result.errors:
            test_name = str(test).split()[0]
            lines = traceback_str.strip().split('\n')
            
            # Find the actual error message
            error_msg = ""
            for line in reversed(lines):
                if line.strip() and not line.startswith(' '):
                    error_msg = line.strip()
                    break
            
            self.error_tests.append({
                'name': test_name,
                'message': error_msg,
                'traceback': lines
            })
        
        # Parse failures
        for test, traceback_str in result.failures:
            test_name = str(test).split()[0]
            lines = traceback_str.strip().split('\n')
            
            # Find the assertion error message
            error_msg = ""
            for line in reversed(lines):
                if "AssertionError:" in line:
                    error_msg = line.replace("AssertionError:", "").strip()
                    break
            
            self.failed_tests.append({
                'name': test_name,
                'message': error_msg,
                'traceback': lines
            })

def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description="Enhanced Beautiful Test Runner for MIT PS5",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 test_runner.py              # Clean output (default)
  python3 test_runner.py --debug      # Show debug output
  python3 test_runner.py --quiet      # Minimal output
  python3 test_runner.py -d --no-details  # Debug but no test details
        """
    )
    
    parser.add_argument('--debug', '-d', 
                       action='store_true',
                       help='Show detailed debug output from tests')
        
    
    return parser.parse_args()

def main():
    """Run the enhanced beautiful test suite"""
    args = parse_arguments()    
    
    # Determine output settings

    show_debug = args.debug

    runner = EnhancedBeautifulTestRunner(
        show_debug=show_debug
    )
    
    try:
        success = runner.run_tests()
        if success:
            print("\n🏆 All tests passed! You're ready for the next challenge! 🏆")
        else:
            print("\n💪 Keep coding! Use the error details above to fix issues! 💪")
    except ImportError as e:
        print(f"❌ Import Error: {e}")
        print("💡 Make sure your ps5.py file is in the same directory!")
    except Exception as e:
        print(f"💥 Unexpected error: {e}")
        print("🔧 Let's try the standard test runner instead...")
        
        # Fallback: run the standard tests
        try:
            print("\n" + "🎓" + "=" * 76 + "🎓")
            print("🎯 FALLBACK: Standard Test Runner Output 🎯")
            print("🎓" + "=" * 76 + "🎓\n")
            
            import subprocess
            result = subprocess.run(['python3', 'ps5_test.py'], 
                                  capture_output=True, text=True, cwd='.')
            
            print(result.stdout)
            if result.stderr:
                print("STDERR:", result.stderr)
            
        except Exception as fallback_error:
            print(f"Even fallback failed: {fallback_error}")
            print("Just run: python3 ps5_test.py")

if __name__ == "__main__":
    main()